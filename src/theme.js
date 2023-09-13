import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark', // Defina o modo inicial como 'dark'
    useSystemColorMode: true,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('#f1f1f1', '#202023')(props),
        color: mode('gray.800', 'gray.200')(props), // Define a cor do texto para o modo escuro
      },
    }),
  },
  components: {
    Heading: {
      variants: {
        'section-title': {
          textDecoration: 'underline',
          fontSize: 20,
          textUnderlineOffset: 6,
          textDecorationColor: mode('#525252', '#a0a0a0'), // Define a cor da linha de sublinhado para o modo escuro
          textDecorationThickness: 4,
          marginTop: 3,
          marginBottom: 4,
          color: mode('gray.800', 'gray.200'), // Define a cor do texto para o modo escuro
        },
      },
    },
    Link: {
      baseStyle: (props) => ({
        color: mode('#3d7aed', '#ff63c3')(props),
        textUnderlineOffset: 3,
      }),
    },
  },
  fonts: {
    heading: "'M PLUS Rounded 1c'",
  },
  colors: {
    grassTeal: '#88ccca',
  },
});

export default theme;
