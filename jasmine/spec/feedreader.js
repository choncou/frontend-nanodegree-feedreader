/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have URLs', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('')
            })
        });

        it('have names', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('')
            })
        });
    });


    describe('The menu', function () {
        var body;

        beforeEach(function () {
            body = $('body');
        });

        it('should be hidden by default', function () {
           expect(body.hasClass('menu-hidden')).toBe(true)
        });

        it('should show and hide on click', function () {
            var menuIcon = $('.menu-icon-link');

            // Should be visible
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);

            // Should change to not visible
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true)
        });
    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            })
        });

        it('contains an entry', function (done) {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function () {
        var firstFeedEntry;

        // Load first feed and save data in variable then load next feed before calling done for test to start
        beforeEach(function (done) {
           loadFeed(0, function () {
               firstFeedEntry = $('.feed').find('.entry')[0].innerHTML;
               loadFeed(1, function () {
                   done();
               })
           })
        });

        it('should change the feed', function (done) {
            expect($('.feed').find('.entry')[0].innerHTML).not.toBe(firstFeedEntry);
            done();
        });
    });
}());
