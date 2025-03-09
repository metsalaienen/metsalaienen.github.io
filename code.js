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
        var section = $('.styled__Container-sc-4e4b9a69-0.dKELtg');
        section.animate({ scrollTop: section.prop("scrollHeight") }, 1000);
      }
  
      var intervalID = setInterval(scrollSectionToBottom, 1000);
  
      // Wait for scroll to finish then execute the rest
      setTimeout(function() {
        clearInterval(intervalID);
  
        // Check if "Select Multiple" menu is open. If so, close it.
        if ($('.styled__SelectionOptions-sc-bb521dd1-7').is(':visible')) {
          $('[data-testid="manage-events__select-multiple"]').click();
        }
  
        // Open the "Select Multiple" menu.
        $('[data-testid="manage-events__select-multiple"]').click();
  
        var clickCount = 0;
        var numDwnld = 0;
        var numRemain = 0;
  
        // Get all elements and reverse the order
        var elements = $('.styled__EventItemWrapper-sc-4e4b9a69-1.xvyWO').get().reverse();
  
        $(elements).each(function() {
          if (clickCount >= 50) {
            return false; // exit the loop
          }
          var cazyZeDiv = $(this).find('.cazyZe');
          if (cazyZeDiv.length == 0 || !cazyZeDiv.text().includes('Downloaded')) {
            var checkmarkSpan = $(this).find('.hgipWl');
            checkmarkSpan.click();
            clickCount++;
          }
        });
  
        $(elements).each(function() {
          var cazyZeDiv = $(this).find('.cazyZe');
          if (cazyZeDiv.length == 0 || !cazyZeDiv.text().includes('Downloaded')) {
            numRemain++;
          }
          if (cazyZeDiv.length != 0 || cazyZeDiv.text().includes('Downloaded')) {
            numDwnld++;
          }
        });
  
        console.log("Downloaded:" + numDwnld);
        console.log("Remaining To Download:" + numRemain);
  
        // Click Download only if items were selected
        if (clickCount > 0) {
          $('[data-testid="manage-events__download"]').click();
        } else {
          console.log("No items selected to download.");
        }
      }, 5000); // Give 5 seconds for scroll to complete. Adjust as needed.
    }
  })();