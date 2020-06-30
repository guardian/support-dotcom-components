import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as autoscaling from '@aws-cdk/aws-autoscaling';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';

export class ContributionsServiceStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string) {
        super(scope, id, { env: { region: 'eu-west-1' } });

        const stage = new cdk.CfnParameter(this, 'Stage', {
            type: 'String',
            default: 'CODE',
        });

        cdk.Tag.add(this, 'Stack', 'frontend');
        cdk.Tag.add(this, 'Stage', stage.value.toString());
        cdk.Tag.add(this, 'App', 'contributions-service');
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

        const confBucket = new cdk.CfnParameter(this, 'ConfBucket', {
            type: 'String',
            description: 'Bucket containing PROD conf file for app',
        });

        const ami = new cdk.CfnParameter(this, 'AMI', {
            type: 'AWS::EC2::Image::Id',
            description: 'AMI ID to be provded by RiffRaff',
            default: 'ami-09455f2a9ec7c31a0',
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
                                'arn:aws:s3:::aws-frontend-artifacts/*',
                                `arn:aws:s3:::${confBucket.valueAsString}/*`,
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
        userData.addCommands(
            'mkdir /etc/gu',
            `aws s3 cp s3://${confBucket.valueAsString}/${stage.valueAsString}/automat-api.private.conf /etc/gu`,
            'aws s3 cp s3://aws-frontend-artifacts/frontend/PROD/contributions-service/contributions-service_1.0-SNAPSHOT_all.deb /tmp',
            'dpkg -i /tmp/contributions-service_1.0-SNAPSHOT_all.deb',
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

        // tslint:disable-next-line: no-unused-expression
        new elbv2.ApplicationLoadBalancer(this, 'LB', {
            vpc,
            internetFacing: true,
        });
    }
}

const app = new cdk.App();
// tslint:disable-next-line: no-unused-expression
new ContributionsServiceStack(app, 'contributions-service');
