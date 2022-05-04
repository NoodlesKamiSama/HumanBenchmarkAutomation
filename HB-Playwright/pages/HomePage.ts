import { Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/');
    }

    async openMenu(menuName: string) {
        await this.page.click(`a h3 >> text="${menuName}"`);
    }
}