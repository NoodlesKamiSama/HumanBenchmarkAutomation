import { fixture, Selector, test } from 'testcafe';

fixture`Human Benchmark`
    .page`https://humanbenchmark.com/`

test('Reaction Time', async t => {
    await t
        .click(Selector('a h3').withText('Reaction Time'))
        .click('.view-splash')
        .click('.view-go');
    console.log(await Selector('.view-result h1').textContent);
})

test('Aim Trainer', async t => {
    await t.click(Selector('a h3').withText('Aim Trainer'));
    let target = Selector('[data-aim-target="true"] div:nth-child(1)');
    while(await target.exists) {
        await t.click(target);
    }
    const result = await Selector('h1').textContent;
    console.log(result);
})

test('Typing Test', async t => {
    let text = Selector('.letters');
    await t.click(Selector('a h3').withText('Typing'));
    await t.typeText(text, await text.textContent)
    const result = await Selector('h1').textContent;
    console.log(result);
})