import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

export type ReactComponent<GenericProps = Record<string, never>> = (
    props: GenericProps,
) => EmotionJSX.Element;
