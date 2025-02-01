import { extendTheme, ThemeConfig } from '@chakra-ui/react'

// Configuration for color mode
const config: ThemeConfig = {
	initialColorMode: 'system',
	useSystemColorMode: true
}

// Extend the theme
export const theme = extendTheme({
	config,
	fonts: {
		heading: "'Roboto', sans-serif",
		body: "'Roboto', sans-serif"
	},
	colors: {
		facebook: {
			50: '#e4eaf3',
			100: '#ccd6e6',
			200: '#b4c1d8',
			300: '#9caddb', // Softer for light mode
			400: '#8397cf',
			500: '#1877F2', // Main Facebook Blue
			600: '#145DBF', // Slightly darker for dark mode
			700: '#0F4C8E',
			800: '#0B3665',
			900: '#06203B' // Darkest tone for improved contrast
		}
	},
	styles: {
		global: props => ({
			body: {
				bg: props.colorMode === 'dark' ? '#1A202C' : '#F7FAFC', // Adjust background
				color: props.colorMode === 'dark' ? 'gray.300' : 'gray.800'
			}
		})
	}
})
