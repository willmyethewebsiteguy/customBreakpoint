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
    
    let sqsEditor = window.top.document;

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
    }
    function removeCustomMobileView() {
      previewContainer.style.width = '';
    }
    
    function addInput() {
      
    }


    mobileButton.addEventListener('click', addCustomMobileView)
    desktopButton.addEventListener('click', removeCustomMobileView)
    editButton.addEventListener('click', removeCustomMobileView)
    
    console.log(breakpoint);
    console.log(previewEl);
    console.log(previewContainer);
  }

  
  handleEvent()
}())