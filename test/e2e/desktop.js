module.exports = {
    'Static text on page' : function (browser) {
        browser
            .url('http://localhost:3000')
            .pause(1000)
            .assert.title('HUGE NavExercise', 'The  tagg <title> is correct')
            .assert.containsText('section div h2', 'Get paid for giving a shit.', 'Headings is present')
            .assert.containsText('section p', 'Lorem ipsum dolor', 'Default text (body copy) is present')
            .end();
    },

    'Anchor Navigation pages' : function (browser) {
        browser
            .url('http://localhost:3000')
            .click('a[title="Events"]')
            .assert.urlContains('events', 'URL Changed successfully')
            .pause(1000)
            .end();
    },

    'Secondary navigator links should navigate to a new page' : function (browser) {
        browser
            .url('http://localhost:3000')
            .click('a[title="About"]')
            .click('a[title="What we do"]')
            .assert.urlContains('what-we-do', 'URL Changed successfully')
            .pause(1000)
            .end();
    },

    'Secondary navigation is hidden by default' : function (browser) {
        browser
            .url('http://localhost:3000')
            .assert.elementNotPresent('.navigation > .nav-template > li.open ul', 'Secondary navigation is hidden by default')
            .pause(1000)
            .end();
    }

};
