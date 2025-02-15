export enum Species {
	// Dog = 'Dog',
	// Cat = 'Cat',
	// Bird = 'Bird',
	// Fish = 'Fish',
	// Rabbit = 'Rabbit',
	// Hamster = 'Hamster',
	// Reptile = 'Reptile',
	// Horse = 'Horse',
	// Exotic = 'Exotic'
	Rose = 'Rose',
	Tulip = 'Tulip',
	Lily = 'Lily',
	Daisy = 'Daisy',
	Sunflower = 'Sunflower',
	Orchid = 'Orchid',
	Lavender = 'Lavender',
	CherryBlossom = 'Cherry Blossom',
	Wildflower = 'Wildflower', // Yovvoyi gullar uchun
	ExoticFlower = 'Exotic Flower', // Ekzotik gullar uchun
}

export enum Gender {
	// Male = 'Male',
	// Female = 'Female',
	// Unknown = 'Unknown'
	Single = 'Single', // Bir gul turi
	Double = 'Double', // Ikki gul turi (masalan, ikki rangli gullar)
	Mixed = 'Mixed', // Aralash gullar yoki ranglar
	Unknown = 'Unknown'
}

export enum Availability {
	// Available = 'Available', // Pet is available for adoption or sale
	// Adopted = 'Adopted', // Pet has been adopted
	// PendingAdoption = 'Pending Adoption', // Pet is waiting for adoption
	// NotAvailable = 'Not Available', // Pet is no longer available
	// Reservation = 'Reservation'
		Blooming = 'Blooming', // Gul ochilmoqda
		Wilted = 'Wilted', // Gul solib ketgan
		PendingBloom = 'Pending Bloom', // Gul ochish uchun kutmoqda
		NotAvailable = 'Not Available', // Gul mavjud emas
		Reserved = 'Reserved', // Gul oldindan buyurtma qilingan

}

export enum Category {
    // Pets = 'Pets', // Actual animals for sale
    // Food = 'Food', // Pet food and treats
    // Toys = 'Toys', // Pet toys
    // Accessories = 'Accessories', // Leashes, collars, beds, etc.
    // Healthcare = 'Healthcare', // Medicines, grooming kits, etc.
    // Clothing = 'Clothing', // Pet clothes
    // Training = 'Training', // Training tools and resources
    // Other = 'Other', // Any miscellaneous pet-related items
    // Grooming = 'Grooming', // Grooming services or products
    // Equipment = 'Equipment', // Pet care equipment like cages, carriers, etc.
    // Furniture = 'Furniture', // Pet furniture like pet beds, houses, etc.
    // Vitamins = 'Vitamins', // Pet vitamins and supplements
    // BreedSpecific = 'Breed-Specific', // Products specific to certain breeds
    // Adoption = 'Adoption', // Services related to adopting pets
    // Rescue = 'Rescue', // Products or services for pet rescue operations
    // Events = 'Events', // Pet-related events and activities
    // Health = 'Health', // Veterinary services, medical supplies
    // Shelters = 'Shelters', // Animal shelters or adoption centers
    // PetInsurance = 'Pet-Insurance', // Insurance services for pets
    // Travel = 'Travel', // Pet travel accessories, services, and products
    // Technology = 'Technology', // Pet tech products like trackers, pet cameras, etc.
    // Books = 'Books', // Books on pet care, training, etc.
    // Art = 'Art', // Pet-related art and prints
	Flowers = 'Flowers', // Gullar sotuvga qo'yilgan
	Seeds = 'Seeds', // Gul urug'lari
	Vases = 'Vases', // Gul idishlari
	Soil = 'Soil', // Tuproq
	Fertilizers = 'Fertilizers', // O'g'itlar
	Tools = 'Tools', // Bog'lanish asboblari
	Accessories = 'Accessories', // Gul bog'lash uchun aksessuarlar
	Arrangements = 'Arrangements', // Gul kompozitsiyalari
	Other = 'Other', // Any miscellaneous pet-related items
	Decor = 'Decor', // Gullar uchun bezaklar
	Books = 'Books', // Gullar haqida kitoblar
	Gifts = 'Gifts', // Gul sovg'alar
	Events = 'Events', // Gul bog'lari yoki gullar bilan bog'liq tadbirlar
	Health = 'Health', // Gul salomatligi va parvarishi
	Technology = 'Technology', // Gul texnologiyalari (masalan, aqlli gul idishlari)
	Workshops = 'Workshops', // Gul parvarishi bo'yicha seminarlar
	Art = 'Art', // Gul mavzusidagi san'at asarlari
    
}


export enum Location {
	Seoul = 'Seoul',
	Busan = 'Busan',
	Incheon = 'Incheon',
	Daegu = 'Daegu',
	Daejeon = 'Daejeon',
	Gwangju = 'Gwangju',
	Suwon = 'Suwon',
	Ulsan = 'Ulsan',
	Changwon = 'Changwon',
	Seongnam = 'Seongnam',
	Goyang = 'Goyang',
	Yongin = 'Yongin',
	Bucheon = 'Bucheon',
	Ansan = 'Ansan',
	Cheongju = 'Cheongju',
	Jeonju = 'Jeonju',
	Cheonan = 'Cheonan',
	Namyangju = 'Namyangju',
	Hwaseong = 'Hwaseong',
	Pohang = 'Pohang',
	Gimhae = 'Gimhae',
	Jinju = 'Jinju',
	Gyeongju = 'Gyeongju',
	Jeju = 'Jeju'
	// Add other cities as needed
}

