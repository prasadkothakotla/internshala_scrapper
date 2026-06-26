const express = require('express');
const { chromium } = require('playwright');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server running');
});

app.post('/scrape', async (req, res) => {
    let browser;

    try {

        const role = req.body.role;

        if (!role) {
            return res.status(400).json({
                error: 'Role is required'
            });
        }

        // Convert "AI Engineer" -> "ai-engineer"
        const searchRole = role
            .trim()
            .replace(/\s+/g, '-')
            .toLowerCase();

        const url =
            `https://internshala.com/jobs/${searchRole}-jobs`;

        console.log('Searching:', url);

        browser = await chromium.launch({
            headless: true
        });

        const page = await browser.newPage();

        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        // Wait for page content
        await page.waitForTimeout(5000);

        const jobs = await page.evaluate((requestedRole) => {

            const data = [];

            const cards = document.querySelectorAll(
                '.individual_internship'
            );

            cards.forEach(card => {

                const jobTitle =
                    card.querySelector(
                        '.job-title-href'
                    )?.innerText?.trim() || '';

                // keep only matching jobs
                if (
                    jobTitle
                        .toLowerCase()
                        .includes(
                            requestedRole.toLowerCase()
                        )
                ) {

                    data.push({

                        role: jobTitle,

                        company:
                            card.querySelector(
                                '.company-name'
                            )?.innerText?.trim() || '',

                        location:
                            card.querySelector(
                                '.locations'
                            )?.innerText?.trim() || '',

                        stipend:
                            card.querySelector(
                                '.stipend'
                            )?.innerText?.trim() || '',

                        url:
                            card.querySelector(
                                'a'
                            )?.href || '',

                        updated:
                            new Date()
                                .toISOString()

                    });
                }
            });

            return data;

        }, role);

        await browser.close();

        console.log(
            `Found ${jobs.length} matching jobs`
        );

        res.json(jobs);

    }
    catch (err) {

        console.error(err);

        if (browser) {
            await browser.close();
        }

        res.status(500).json({
            error: err.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on ${PORT}`);
});