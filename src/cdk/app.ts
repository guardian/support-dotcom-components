import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as autoscaling from '@aws-cdk/aws-autoscaling';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as ssm from '@aws-cdk/aws-ssm';

export class ContributionsServiceStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string) {
        super(scope, id, { env: { region: 'eu-west-1' } });

        const stage = new cdk.CfnParameter(this, 'Stage', {
            type: 'String',
            default: 'CODE',
        });

        const app = new cdk.CfnParameter(this, 'App', {
            type: 'String',
            default: 'contributions-service-ec2',
        });

        const stack = new cdk.CfnParameter(this, 'Stack', {
            type: 'String',
            default: 'frontend',
        });

        const certificateArn = new cdk.CfnParameter(this, 'CertificateArn', {
            type: 'String',
        });

        cdk.Tag.add(this, 'Stack', stack.value.toString());
        cdk.Tag.add(this, 'Stage', stage.value.toString());
        cdk.Tag.add(this, 'App', app.value.toString());
        cdk.Tag.add(this, 'Owner', 'slot-machine');

        const vpcId = new cdk.CfnParameter(this, 'VpcId', {
            type: 'AWS::EC2::VPC::Id',
            description: 'VPC in which instances will run',
        });

        const publicSubnets = new cdk.CfnParameter(this, 'Subnets', {
            type: 'List<AWS::EC2::Subnet::Id>',
            description: 'Subnets where instances will run',
        });

        const availabilityZones = new cdk.CfnParameter(this, 'AZs', {
            type: 'List<AWS::EC2::AvailabilityZone::Name>',
            description: 'List of AZs',
        });

        const ami = new cdk.CfnParameter(this, 'AMI', {
            type: 'AWS::EC2::Image::Id',
            description: 'AMI ID to be provded by RiffRaff',
        });

        const vpc = ec2.Vpc.fromVpcAttributes(this, 'vpc', {
            vpcId: vpcId.valueAsString,
            availabilityZones: availabilityZones.valueAsList,
            publicSubnetIds: publicSubnets.valueAsList,
        });

        const role = new iam.Role(this, 'role', {
            assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
            inlinePolicies: {
                instancePolicy: new iam.PolicyDocument({
                    statements: [
                        new iam.PolicyStatement({
                            effect: iam.Effect.ALLOW,
                            resources: [
                                'arn:aws:s3:::aws-frontend-contributions-service/*',
                                // `arn:aws:s3:::${confBucket.valueAsString}/*`,
                            ],
                            actions: ['s3:GetObject', 's3:HeadObject', 's3:List*'],
                        }),
                        new iam.PolicyStatement({
                            effect: iam.Effect.ALLOW,
                            resources: ['*'],
                            actions: ['ssmmessages:*', 'ssm:*', 'ec2messages:*', 'logs:*'],
                        }),
                    ],
                }),
            },
        });

        const userData = ec2.UserData.forLinux();
        const App = app.value.toString();
        const Stack = stack.value.toString();
        const Stage = stage.value.toString();

        const baseUrl = ssm.StringParameter.valueForStringParameter(
            this,
            `/contributions-service/${stage.valueAsString}/base_url`,
        );

        const logTargeting = ssm.StringParameter.valueForStringParameter(
            this,
            `/contributions-service/${stage.valueAsString}/log_targeting`,
        );

        const logCompareVariants = ssm.StringParameter.valueForStringParameter(
            this,
            `/contributions-service/${stage.valueAsString}/log_compare_variants`,
        );

        const logFailedTestFilter = ssm.StringParameter.valueForStringParameter(
            this,
            `/contributions-service/${stage.valueAsString}/log_failed_test_filter`,
        );

        userData.addCommands(
            `groupadd frontend`,
            `useradd -r -m -s /usr/bin/nologin -g frontend ${App}`,

            `export App=${App}`,
            `export Stack=${Stack}`,
            `export Stage=${Stage}`,
            `export NODE_ENV=production`,
            `export BASE_URL=${baseUrl}`,
            `export LOG_TARGETING=${logTargeting}`,
            `export LOG_COMPARE_VARIANTS=${logCompareVariants}`,
            `export LOG_FAILED_TEST_FILTER=${logFailedTestFilter}`,

            `aws s3 cp s3://aws-frontend-contributions-service/frontend/${Stage}/contributions-service-ec2/contributions-service-ec2.zip /tmp/${App}.zip`,
            `mkdir -p /opt/${App}`,
            `unzip /tmp/${App}.zip -d /opt/${App}`,
            `chown -R ${App}:frontend /opt/${App}`,

            `export PM2_HOME="/usr/share/${App}"`,

            `/usr/local/node/pm2 start --name ${App} --uid ${App} --gid frontend /opt/${App}/server.js`,
        );

        const asg = new autoscaling.AutoScalingGroup(this, 'ASG', {
            vpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3A, ec2.InstanceSize.SMALL),
            machineImage: ec2.MachineImage.genericLinux({
                'eu-west-1': ami.valueAsString,
            }),
            userData: userData,
            role: role,
            vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
            associatePublicIpAddress: true,
            maxCapacity: 2,
        });

        asg.scaleOnCpuUtilization('GT80CPU', { targetUtilizationPercent: 80 });

        const lb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
            vpc,
            internetFacing: true,
            loadBalancerName: `contributions-service-${Stage}`,
        });

        const listener = lb.addListener('Listener', {
            port: 443,
            certificateArns: [certificateArn.value.toString()],
        });

        listener.addTargets('Target', {
            port: 3030,
            protocol: elbv2.ApplicationProtocol.HTTP,
            targets: [asg],
            healthCheck: {
                path: '/healthcheck',
                healthyThresholdCount: 2,
                unhealthyThresholdCount: 5,
                interval: cdk.Duration.seconds(30),
                timeout: cdk.Duration.seconds(10),
            },
        });
    }
}

const app = new cdk.App();
// tslint:disable-next-line: no-unused-expression
new ContributionsServiceStack(app, 'contributions-service-ec2');
