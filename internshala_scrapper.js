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
            `https://internshala.com/internships/keywords-${searchRole}`;

        console.log('Searching:', url);

        browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox']
        });

        const page = await browser.newPage();

        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        await page.waitForTimeout(5000);

        const internships = await page.evaluate(() => {

            const data = [];

            // Keywords considered relevant
            const aiKeywords = [
                'ai',
                'artificial intelligence',
                'machine learning',
                'ml',
                'genai',
                'llm',
                'rag',
                'prompt',
                'deep learning',
                'neural',
                'data science',
                'data analytics',
                'agentic',
                'automation'
            ];

            const cards =
                document.querySelectorAll(
                    '.individual_internship'
                );

            console.log(
                'Cards found:',
                cards.length
            );

            cards.forEach(card => {

                const title =
                    card.querySelector(
                        '.job-title-href'
                    )?.innerText?.trim() || '';

                const lowerTitle =
                    title.toLowerCase();

                const isRelevant =
                    aiKeywords.some(
                        keyword =>
                            lowerTitle.includes(keyword)
                    );

                if (!isRelevant) {
                    return;
                }

                const company =
                    card.querySelector(
                        '.company-name'
                    )?.innerText?.trim() || '';

                const location =
                    card.querySelector(
                        '.locations'
                    )?.innerText?.trim() || '';

                const stipend =
                    card.querySelector(
                        '.stipend'
                    )?.innerText?.trim() || '';

                const internshipUrl =
                    card.querySelector(
                        'a'
                    )?.href || '';

                data.push({

                    role: title,
                    company,
                    location,
                    stipend,
                    url: internshipUrl,
                    updated:
                        new Date()
                            .toISOString()

                });

            });

            return data;

        });

        await browser.close();

        console.log(
            `Found ${internships.length} AI internships`
        );

        res.json(internships);

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
    console.log(
        `Server running on ${PORT}`
    );
});