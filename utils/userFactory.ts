import { Page } from "@playwright/test";


export interface TestUser {
    email: string;
    password: string;
}

export async function createTestUser(page: Page): Promise<TestUser> {
    const email = `user${Date.now()}@example.com`;
    const password = 'NyGosuPass1@';

    return { email, password }
}