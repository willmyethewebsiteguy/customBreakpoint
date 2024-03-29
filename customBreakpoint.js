/* ==========
 * SQS Edit Mode Breakpoint
 * This Code is licensed by Will-Myers.com 
=========== */
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
      }, 501);
    }
    
    function checkMode() {
      if(sqsEditor.querySelector('[aria-controls="phone-tab"][aria-selected="true"]')){
        addCustomMobileView()
      }
    }

    // MutationObserver callback function
    function mutationCallback(mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          if (mutation.target.classList.contains('sqs-edit-mode-active') ||
              (mutation.target.id === 'footer-sections' && mutation.target.dataset.isEditing === 'true')) {
            checkMode();
          }
        }
      }
    }

    // Initialize MutationObserver
    let observer = new MutationObserver(mutationCallback);

    // Start observing the body for attribute changes
    observer.observe(document.body, { attributes: true });

    // Optionally observe #footer-sections for attribute changes
    let footerSections = document.getElementById('footer-sections');
    if (footerSections) {
      observer.observe(footerSections, { attributes: true });
    }

    mobileButton.addEventListener('click', addCustomMobileView)
    desktopButton.addEventListener('click', removeCustomMobileView)
  }

  handleEvent()
}());
