/* ==========
 * SQS Edit Mode Breakpoint
 * This Code is licensed by Will-Myers.com 
========== */
(function(){  
  const settings = {
    previewViewport: '.preview-viewport',
    mobileButton: '[aria-controls="phone-tab"]',
    desktopButton: '[aria-controls="desktop-tab"]',
    editButton: '[data-test="frameToolbarEdit"]'
  }

  function handleEvent() {
    if (window.self == window.top) return;

    let sqsEditor = window.top.document,
        self = window.self.document;

    let breakpointEl = document.querySelector('html'),
        breakpointElStyles = window.getComputedStyle(breakpointEl),
        breakpoint = breakpointElStyles.getPropertyValue('--sqs-edit-mode-breakpoint');

    let previewEl = sqsEditor.querySelector(settings.previewViewport),
        previewContainer = previewEl.parentElement;

    let mobileButton = sqsEditor.querySelector(settings.mobileButton),
        desktopButton = sqsEditor.querySelector(settings.desktopButton),
        editButton = sqsEditor.querySelector(settings.editButton);

    function getBreakpoint() {
      breakpointElStyles = window.getComputedStyle(breakpointEl),
        breakpoint = breakpointElStyles.getPropertyValue('--sqs-edit-mode-breakpoint');
    }

    function addCustomMobileView() {
      getBreakpoint();
      previewContainer.style.width = breakpoint;
      window.setTimeout(function() {
        sqsEditor.querySelector('html').style.setProperty('--frame-width', breakpoint);
        sqsEditor.querySelector('html').style.setProperty('--wm-frame-width', breakpoint);
      }, 501);

    }
    function removeCustomMobileView() {
      previewContainer.style.width = '100%';
      window.setTimeout(function() {
        sqsEditor.querySelector('html').style.setProperty('--frame-width', window.self.innerWidth + 'px');
        sqsEditor.querySelector('html').style.setProperty('--wm-frame-width', window.self.innerWidth + 'px');
        console.log()
      }, 501);
    }
    
    function editButtonClick() {
      function checkMode() {
        if (!self.body.querySelector('.sqs-edit-mode-active')) return;
        
        if(sqsEditor.querySelector('[aria-controls="mobile-tab"][aria-selected="true"]')){
          addCustomMobileView()
        }
      }
      window.setTimeout(checkMode(), 301);
    }

    mobileButton.addEventListener('click', addCustomMobileView)
    desktopButton.addEventListener('click', removeCustomMobileView)
    editButton.addEventListener('click', editButtonClick)
  }

  handleEvent()
}());
