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


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('should have a url', function() {
                for(let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
           
         });

               
        /* Now we check for the feeds to have a name defined, and that "name" isn't empty.
         */
         it('should have a name', function() {
                for(let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });


    /* Now we test the menu. */
    describe('The Menu', function() {
        const icon = document.querySelector('i');
        const body = document.querySelector('body');

        /* We want to make sure the menu element is
         * hidden by default. by checking the class of <body>.
         */

         it('should be hidden by default', function (){
            expect(body).hasClass('menu-hidden').toBe(true);
         });

         /* Checking to see if the menu changes
          * visibility when the menu icon is clicked. 
          */

         it('should open and close when clicked', function(){
           icon.click();
            expect(body).hasClass('menu-hidden').toBe(false);
            icon.click();
            expect(body).hasClass('menu-hidden').toBe(true);
          });
    });

    /* Now we check Initial Entries */
    describe('Initial entries', function(){

    const feed = document.querySelector('.feed');
    const entry = document.querySelector('.entry');
    const feedsList = [];

    
        /* Checking the loadFeed function to make sure that when the
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container. The function pulls
         * data from outside the page, making it asynchronous.
         * 
         */
         beforeEach(function(done){
            loadFeed(0, done); 
         });

         it('has at least one entry', function(){
            for (let feed of allFeeds){
                feedsList.push(entry);
            };
            expect(feedsList.length).not.toBe(0);
         });
     });
    /* Here we check New Feed Selection */
    describe('New Feed Selection', function(){
        const feed = document.querySelector('.feed');
        const entry = document.querySelectorAll('.entry');
        const feedOne = [];
        //const feedTwo = []; not necessary after all
        

        /* Checking that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * 
         */
         beforeEach(function(done) {
            loadFeed(0,function() {
             Array.from(feed.children).forEach(function(entry) {
            feedOne.push(entry.innerText);
                });
            loadFeed(1,done);
            });
        }); 
            it('changes to new content', function(){
                Array.from(feed.children).forEach(function(entry, index){
                    //used console.log to check content
                    //console.log(entry.innerText, feedOne[index], entry.innerText === feedOne[index]);
                    expect(entry.innerText).not.toEqual(feedOne[index]);
                });

            });
         
    });

         
    
}());
