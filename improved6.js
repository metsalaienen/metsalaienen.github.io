(function() {
  // Add jQuery if not already present
  if (typeof jQuery == 'undefined') {
    var jq = document.createElement('script');
    jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    jq.onload = function() {
      main();
    };
  } else {
    main();
  }

  function main() {
    var $ = jQuery.noConflict();

    // Scroll to Bottom
    function scrollSectionToBottom() {
      var section = $('.styled__Container-sc-4e4b9a69-0.gxyyNy');
      section.animate({ scrollTop: section.prop("scrollHeight") }, 1000);
    }

    var intervalID = setInterval(scrollSectionToBottom, 1000);

    // Wait for scroll to finish then execute the rest
    setTimeout(function() {
      clearInterval(intervalID);
      waitForElements();
    }, 5000); // Give 5 seconds for scroll to complete. Adjust as needed.

    function waitForElements() {
      var interval = setInterval(function() {
        if ($('.styled__EventItemWrapper-sc-4e4b9a69-1').length > 0) {
          clearInterval(interval);
          processDownloadCycle();
        }
      }, 500); // Check every 500ms
    }

    function processDownloadCycle() {
      selectAndDownload();
    }

    function selectAndDownload() {
      var $ = jQuery.noConflict();
      var clickCount = 0;
      var numDwnld = 0;
      var numRemain = 0;

      // Re-fetch and filter out downloaded items
      var elements = $('.styled__EventItemWrapper-sc-4e4b9a69-1')
        .filter(function() {
          return $(this).find('.styled__Container-sc-b2da93fb-0').length === 0; // Filter out downloaded items
        })
        .get().reverse();

      $(elements).each(function() {
        if (clickCount >= 50) {
          return false; // exit the loop
        }

        var eventItem = $(this);
        var checkmarkSpan = eventItem.find('.styled__Checkmark-sc-37715530-1');
        checkmarkSpan.click();
        clickCount++;
      });

      // Re-fetch and filter for counting
      var allElements = $('.styled__EventItemWrapper-sc-4e4b9a69-1').get().reverse();

      $(allElements).each(function() {
        var eventItem = $(this);
        var downloadedBadge = eventItem.find('.styled__Container-sc-b2da93fb-0'); // Check for the downloaded badge

        if (downloadedBadge.length === 0) {
          numRemain++;
        } else {
          numDwnld++;
        }
      });

      console.log("Downloaded:" + numDwnld);
      console.log("Remaining To Download:" + numRemain);

      // Click Download only if items were selected
      if (clickCount > 0) {
        $('[data-testid="manage-events__download"]').click();
        // Wait for download to start (adjust as needed)
        setTimeout(deselectAndRepeat, 5000);
      } else {
        console.log("No items selected to download.");
        console.log("Finished all downloads.");
      }
    }

    function deselectAndRepeat() {
      var $ = jQuery.noConflict();
      // Click deselect all
      $('[data-testid="manage-events__deselect-all"]').click();
      // Wait for deselect to complete (adjust as needed)
      setTimeout(selectAndDownload, 2000);
    }
  }
})();