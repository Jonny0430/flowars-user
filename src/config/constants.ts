import { AiOutlineDollar, AiOutlineTeam, AiOutlineUnorderedList } from 'react-icons/ai'
import { BsPersonFillAdd, BsPersonHeart } from 'react-icons/bs'
import { CiViewList } from 'react-icons/ci'
import {
	FaBookReader,
	FaChalkboardTeacher,
	FaDraftingCompass,
	FaFirstdraft,
	FaListAlt,
	FaQuestionCircle,
	FaRibbon,
	FaStar,
	FaUserTie
} from 'react-icons/fa'
import { FaUsersBetweenLines } from 'react-icons/fa6'
import { FcInspection, FcManager, FcTodoList } from 'react-icons/fc'
import { FiEdit, FiHome, FiTrendingUp } from 'react-icons/fi'
import { GiTropicalFish } from 'react-icons/gi'
import { GrArticle } from 'react-icons/gr'
import { ImBooks } from 'react-icons/im'
import { LuBird } from 'react-icons/lu'
import { MdImportContacts, MdOutlineContactMail, MdOutlineCreateNewFolder } from 'react-icons/md'
import { RiMoneyDollarBoxLine } from 'react-icons/ri'
import { SiApachetomcat, SiDatadog, SiFoodpanda } from 'react-icons/si'
import { TbTruckDelivery } from 'react-icons/tb'
import { EngIcons, FinishRightIcon, RightLineIcon, RusIcons, UzbIcons } from 'src/icons'
import KorIcon from 'src/icons/translate/ko'

export const navigation = [
	{
		title: 'sidebar_title_1',
		links: [
			{
				label: 'sidebar_title_1_explore',
				route: '/',
				icon: FiHome
			},
			{
				label: 'sidebar_title_1_products',
				route: '/products',
				icon: CiViewList
			},
			{
				label: 'sidebar_title_1_books',
				route: '/books',
				icon: FaBookReader
			},
			{
				label: 'sidebar_title_1_articles',
				route: '/articles',
				icon: MdImportContacts
			},
			{
				label: 'sidebar_title_1_team',
				route: '/team',
				icon: AiOutlineTeam
			},
			{
				label: 'sidebar_title_1_become_agent',
				route: '/become-agent',
				icon: BsPersonFillAdd
			},
			{
				label: 'sidebar_title_1_statistics',
				route: '/statistics',
				icon: FiTrendingUp
			}
		]
	},
	{
		title: 'sidebar_title_2',
		links: [
			{
				label: 'sidebar_title_2_about',
				route: '/about',
				icon: FaDraftingCompass
			},
			{
				label: 'sidebar_title_2_contact',
				route: '/contact',
				icon: MdOutlineContactMail
			},
			{
				label: 'sidebar_title_2_pricing',
				route: '/pricing',
				icon: AiOutlineDollar
			},
			{
				label: 'sidebar_title_2_faq',
				route: '/faq',
				icon: FaQuestionCircle
			}
		]
	}
]

export const categories = [
	{
		name: 'category_1',
		id: 1,
		image: '/images/cat.svg'
	},
	{
		name: 'category_2',
		id: 2,
		image: '/images/dogs.svg'
	},
	{
		name: 'category_3',
		id: 3,
		image: '/images/bird.svg'
	},
	{
		name: 'category_4',
		id: 4,
		image: '/images/fish.svg'
	},
	{
		name: 'category_5',
		id: 5,
		image: '/images/reptile.svg'
	},
	{
		name: 'category_6',
		id: 6,
		image: '/images/petfood.svg'
	},
	{
		name: 'category_7',
		id: 7,
		image: '/images/animalcare.svg'
	}
]
export const trustedCompeny = [SiDatadog, SiApachetomcat, GiTropicalFish, LuBird, SiFoodpanda, TbTruckDelivery]

export const language = [
	{ nativeLng: 'English', lng: 'en', icon: EngIcons },
	{ nativeLng: 'Korean', lng: 'ko', icon: KorIcon },
	{ nativeLng: 'Русский', lng: 'ru', icon: RusIcons },
	{ nativeLng: "O'zbek", lng: 'uz', icon: UzbIcons }
]
export const howItWorks = [
	{ title: 'how_it_works_first_step', image: '/images/order.svg' },
	{ title: '', icon: RightLineIcon },
	{ title: 'how_it_works_second_step', image: '/images/payment.svg' },
	{ title: '', icon: FinishRightIcon },
	{ title: 'how_it_works_third_step', image: '/images/delivery.svg' }
]

export const productsFilter = [
	{
		title: 'filter_category_title',
		id: 'category',
		categoryList: [
			{ name: 'filter_category_item_1', id: 'pets' },
			{ name: 'filter_category_item_2', id: 'food' },
			{ name: 'filter_category_item_3', id: 'toys' },
			{ name: 'filter_category_item_4', id: 'accessories' },
			{ name: 'filter_category_item_5', id: 'healthcare' },
			{ name: 'filter_category_item_6', id: 'adoption' },
			{ name: 'filter_category_item_7', id: 'technology' },
			{ name: 'filter_category_item_8', id: 'other' }
		]
	},
	{
		title: 'fitler_rating_title',
		id: 'rating',
		categoryList: [
			{ name: 'fitler_rating_item_1', id: '4.5' },
			{ name: 'fitler_rating_item_2', id: '4' },
			{ name: 'fitler_rating_item_3', id: '3.5' },
			{ name: 'fitler_rating_item_4', id: '3' }
		]
	},
	{
		title: 'filter_location_title',
		id: 'location',
		categoryList: [
			{ name: 'filter_location_item_1', id: 'seoul' },
			{ name: 'filter_location_item_2', id: 'busan' },
			{ name: 'filter_location_item_3', id: 'incheon' },
			{ name: 'filter_location_item_4', id: 'daegu' },
			{ name: 'filter_location_item_5', id: 'daejeon' },
			{ name: 'filter_location_item_6', id: 'gwangju' },
			{ name: 'filter_location_item_7', id: 'suwon' },
			{ name: 'filter_location_item_8', id: 'ulsan' },
			{ name: 'filter_location_item_9', id: 'changwon' },
			{ name: 'filter_location_item_10', id: 'seongnam' },
			{ name: 'filter_location_item_11', id: 'goyang' },
			{ name: 'filter_location_item_12', id: 'yongin' },
			{ name: 'filter_location_item_13', id: 'bucheon' },
			{ name: 'filter_location_item_14', id: 'ansan' },
			{ name: 'filter_location_item_15', id: 'cheongju' },
			{ name: 'filter_location_item_16', id: 'jeonju' },
			{ name: 'filter_location_item_17', id: 'cheonan' },
			{ name: 'filter_location_item_18', id: 'namyangju' },
			{ name: 'filter_location_item_19', id: 'hwaseong' },
			{ name: 'filter_location_item_20', id: 'pohang' },
			{ name: 'filter_location_item_21', id: 'gimhae' },
			{ name: 'filter_location_item_22', id: 'jinju' },
			{ name: 'filter_location_item_23', id: 'gyeongju' },
			{ name: 'filter_location_item_24', id: 'jeju' }
		]
	}
]

export const booksCategory = [
	{
		label: 'filter_all_category',
		id: 'all-categories'
	},
	{
		label: 'filter_pets',
		id: 'pets'
	},
	{
		label: 'filter_food',
		id: 'food'
	},
	{
		label: 'filter_healthcare',
		id: 'healthcare'
	},
	{
		label: 'filter_toys',
		id: 'toys'
	},
	{
		label: 'filter_accessories',
		id: 'accessories'
	},
	{
		label: 'filter_training',
		id: 'training'
	}
]

export const faq = [
	{
		question: 'faq_question_1',
		answer: 'faq_answer_1'
	},
	{
		question: 'faq_question_2',
		answer: 'faq_answer_2'
	},
	{
		question: 'faq_question_3',
		answer: 'faq_answer_3'
	},
	{
		question: 'faq_question_4',
		answer: 'faq_answer_4'
	},
	{
		question: 'faq_question_5',
		answer: 'faq_answer_5'
	},
	{
		question: 'faq_question_6',
		answer: 'faq_answer_6'
	},
	{
		question: 'faq_question_7',
		answer: 'faq_answer_7'
	}
]

export const tablist = [
	{
		name: 'overview',
		Icon: FaRibbon
	},
	{
		name: 'review',
		Icon: FaStar
	},
	{
		name: 'mentor',
		Icon: FaUserTie
	}
]

export const avatars = [
	{
		name: 'Ryan Florence',
		url: 'https://bit.ly/ryan-florence'
	},
	{
		name: 'Segun Adebayo',
		url: 'https://bit.ly/sage-adebayo'
	},
	{
		name: 'Kent Dodds',
		url: 'https://bit.ly/kent-c-dodds'
	},
	{
		name: 'Prosper Otemuyiwa',
		url: 'https://bit.ly/prosper-baba'
	},
	{
		name: 'Christian Nwamba',
		url: 'https://bit.ly/code-beast'
	}
]

export const teachValues = [
	{
		title: 'teach_your_way',
		description: 'teach_your_way_description',
		icon: FcManager
	},
	{
		title: 'inspire_learners',
		description: 'inspire_learners_ddescription',
		icon: FcInspection
	},
	{
		title: 'get_rewarded',
		description: 'get_rewarded_description',
		icon: FcTodoList
	}
]

export const agentSidebar = [
	{
		name: 'Clients',
		icon: BsPersonHeart,
		route: 'clients'
	},
	{
		name: 'Products',
		icon: FaListAlt,
		route: 'products'
	},
	{
		name: 'Create product',
		icon: MdOutlineCreateNewFolder,
		route: 'create-product'
	},
	{
		name: 'Edit products',
		icon: FiEdit,
		route: 'edit-products'
	},
	{
		name: 'Draft products',
		icon: FaFirstdraft,
		route: 'draft-products'
	},
	{
		name: 'Revenue',
		icon: RiMoneyDollarBoxLine,
		route: 'revenue'
	}
]

export const productClient = [
	{
		id: 1,
		email: 'ab@gmail.com',
		fullName: 'Max Ismoilov',
		year: 'month',
		user: 100
	},
	{
		id: 2,
		email: 'cd@gmail.com',
		fullName: 'Kamila Asadova',
		year: 'month_1',
		user: 80
	},
	{
		id: 3,
		email: 'ef@gmail.com',
		fullName: 'Timur Khalilov',
		year: 'month_2',
		user: 120
	},
	{
		id: 4,
		email: 'gh@gmail.com',
		fullName: 'Nilufar Bekmuratova',
		year: 'month_3',
		user: 90
	},
	{
		id: 5,
		email: 'ij@gmail.com',
		fullName: 'Rustam Yuldashev',
		year: 'month_4',
		user: 20
	},
	{
		id: 6,
		email: 'kl@gmail.com',
		fullName: 'Malika Nazarova',
		year: 'month_5',
		user: 50
	},
	{
		id: 7,
		email: 'mn@gmail.com',
		fullName: 'Shodiyor Alimov',
		year: 'month_6',
		user: 120
	},
	{
		id: 8,
		email: 'op@gmail.com',
		fullName: 'Dildora Tursunova',
		year: 'month_7',
		user: 71
	},
	{
		id: 9,
		email: 'qr@gmail.com',
		fullName: 'Zafar Iskandarov',
		year: 'month_8',
		user: 240
	},
	{
		id: 10,
		email: 'st@gmail.com',
		fullName: 'Shaxzod Ahmedov',
		year: 'month_9',
		user: 87
	},
	{
		id: 11,
		email: 'uv@gmail.com',
		fullName: 'Umida Karimova',
		year: 'month_10',
		user: 110
	},
	{
		id: 12,
		email: 'wx@gmail.com',
		fullName: 'Jahongir Safarov',
		year: 'month_11',
		user: 230
	}
]

export const productServer = [
	{
		id: 1,
		year: 'month',
		product: 50
	},
	{
		id: 2,
		year: 'month_1',
		product: 150
	},
	{
		id: 3,
		year: 'month_2',
		product: 320
	},
	{
		id: 4,
		year: 'month_3',
		product: 250
	},
	{
		id: 5,
		year: 'month_4',
		product: 320
	},
	{
		id: 6,
		year: 'month_5',
		product: 150
	},
	{
		id: 7,
		year: 'month_6',
		product: 420
	},
	{
		id: 8,
		year: 'month_7',
		product: 371
	},
	{
		id: 9,
		year: 'month_8',
		product: 440
	},
	{
		id: 10,
		year: 'month_9',
		product: 517
	},
	{
		id: 11,
		year: 'month_10',
		product: 610
	},
	{
		id: 12,
		year: 'month_11',
		product: 530
	}
]

export const productGender = ['Male', 'Female', 'Unknown']

export const productLocation = [
	'Seoul',
	'Busan',
	'Incheon',
	'Daegu',
	'Daejeon',
	'Gwangju',
	'Suwon',
	'Ulsan',
	'Changwon',
	'Seongnam',
	'Goyang',
	'Yongin',
	'Bucheon',
	'Ansan',
	'Cheongju',
	'Jeonju',
	'Cheonan',
	'Namyangju',
	'Hwaseong',
	'Pohang',
	'Gimhae',
	'Jinju',
	'Gyeongju',
	'Jeju'
]

export const productSpecies = ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Hamster', 'Reptile', 'Horse', 'Exotic']

export const productAvailability = [
	'Available',
	'Adopted',
	'Pending Adoption',
	'Not Available',
	'Reservation' // 예약중 in English
]

export const productCategory = ['pets', 'food', 'toys', 'accessories', 'healthcare', 'other', 'adoption', 'technology']

export const productAge = [
	'1 week',
	'2 weeks',
	'3 weeks',
	'1 month',
	'2 months',
	'3 months',
	'6 months',
	'9 months',
	'1 year',
	'1.5 years',
	'2 years',
	'3 years',
	'4 years',
	'5 years',
	'10 years',
	'15 years',
	'20 years',
	'25 years',
	'30 years'
]

export const productPrice = [
	11000,
	24000,
	36000,
	49000,
	61000,
	74000,
	86000,
	99000,
	111000,
	124000,
	136000,
	149000,
	161000,
	174000,
	187000,
	199000,
	212000,
	224000,
	237000,
	249000,
	262000,
	274000,
	287000,
	299000,
	312000,
	324000,
	337000,
	350000,
	362000,
	375000,
	387000,
	400000,
	412000,
	425000,
	437000,
	450000,
	462000,
	475000,
	487000,
	500000
]

export const booksCategories = [
	'pets', // Actual animals for sale or adoption
	'food', // Pet food and treats
	'healthcare', // Medicines, grooming kits, and veterinary services
	'toys', // Pet enrichment and play
	'accessories', // Leashes, collars, beds, etc.
	'training' // Training tools and resources
]

export const adminSidebar = [
	{
		name: 'Users',
		icon: FaUsersBetweenLines,
		route: 'users'
	},
	{
		name: 'Agents',
		icon: FaChalkboardTeacher,
		route: 'agents'
	},
	{
		name: 'Products',
		icon: AiOutlineUnorderedList,
		route: 'products'
	},
	{
		name: 'Books',
		icon: ImBooks,
		route: 'books'
	},
	{
		name: 'Artiles',
		icon: GrArticle,
		route: 'articles'
	}
]
