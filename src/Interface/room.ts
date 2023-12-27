export interface Room {
    _id: string,
    name: string,
    description: string,
    imageUrl: string,
    imageUrlList: string[],
    areaInfo: string,
    bedInfo: string,
    maxPeople: number,
    price: number,
    status: 1,
    facilityInfo: FacilityOrAmenityInfo[],
    amenityInfo: FacilityOrAmenityInfo[],
    createdAt: Date,
    updatedAt: Date
}

interface FacilityOrAmenityInfo {
    title: string,
    isProvide: boolean
}

