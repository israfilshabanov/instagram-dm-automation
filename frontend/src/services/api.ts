import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface BriefData {
    // BÖLÜM 1: ƏSAS MƏLUMATLAR
    businessName: string;
    businessDescription: string;
    yearsInBusiness: string;
    mission: string;
    coreValues: string;
    
    // BÖLÜM 2: XİDMƏTLƏR VƏ QRUPLAR
    servicesList: string;
    serviceDetails: string;
    hasTrialClass: string;
    groupVsIndividual: string;
    
    // BÖLÜM 3: QİYMƏTLƏR
    pricingDetails: string;
    subscriptionPlans: string;
    packageDiscounts: string;
    familyDiscounts: string;
    paymentMethods: string;
    priceResponsePolicy: string;
    
    // BÖLÜM 4: İŞ SAATLARI VƏ MƏKAN
    workingDays: string;
    workingHours: string;
    holidaySchedule: string;
    mainAddress: string;
    directionsInfo: string;
    otherBranches: string;
    onlineServices: string;
    
    // BÖLÜM 5: ƏLAQƏ VƏ QEYDİYYAT
    phoneNumber: string;
    email: string;
    website: string;
    socialMedia: string;
    registrationProcess: string;
    
    // BÖLÜM 6: TƏZ-TƏZ SORUŞULAN SUALLAR
    faq: string;
    
    // BÖLÜM 7: ÜSLİP VƏ DİL
    preferredLanguage: string;
    communicationStyle: string;
    useEmojis: string;
    responseLength: string;
    
    // BÖLÜM 8: MƏHDUDIYYƏTLƏR
    mentionCompetitors: string;
    exactPricing: string;
    topicsToAvoid: string;
    urgentCases: string;
    complaintHandling: string;
}

export const savePrompt = async (briefData: BriefData): Promise<{ success: boolean; generatedPrompt: string }> => {
    const response = await api.post('/admin/savePrompt', { briefData });
    return response.data;
};

export const testPrompt = async (message: string) => {
    const response = await api.post('/admin/testPrompt', { message });
    return response.data;
};
