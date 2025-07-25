import { test, expect } from '@playwright/test';

test('login then restart', async ({ page }) => {
    const ip: string = process.env.ROUTER_IP as string;
    const user: string = process.env.ROUTER_USER as string;
    const pass: string = process.env.ROUTER_PASSWORD as string;

    await page.goto(ip);

    // fill the username and password, then press on login
    await page.fill('input[id="user_login"]', user);
    await page.fill('input[id="user_password"]', pass);

    await page.locator('#btnLogin').click();

    // Wait for status (main page) to appear
    page.locator('span#Status_Overview_Subtitle').waitFor();

    // click on the admin tab
    const adminBtn = page.locator('#topMenu > li > a > b', { hasText: 'Admin' });
    await expect(adminBtn).toBeVisible();
    await adminBtn.click();

    // Wait for Admin page to appear
    page.locator('p#Admin_Management_Subtitle').waitFor();

    // click on device reset sub-tab
    const subTabReset = page.locator('#submenus > li > a', { hasText: 'Device Reset' });
    await expect(subTabReset).toBeVisible();
    await subTabReset.click();

    // Wait for Device Reset page to appear
    page.locator('p#Admin_DevReboot_Subtitle').waitFor();

    // prepare to listen for the dialog that confirm the modem reboot
    page.on('dialog', async dialog => {
        const alertMessage = dialog.message(); // Capture the alert text
        expect(alertMessage).toContain("Reboot modem?");
        await dialog.accept(); // Automatically click "OK"
    });

    // click on Reboot button
    await page.locator('#reboot').waitFor();
    await page.locator('#reboot').click();
});