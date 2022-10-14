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
      self.head.insertAdjacentHTML('afterbegin', `
      <style id="wm-drag-handle">
        .fluid-engine.is-editing > [data-onboarding="drag-handle"]:last-child{
          right: calc(50% - 150px) !important;
        }
      <style>`);
      getBreakpoint();
      previewContainer.style.width = breakpoint;
    }
    function removeCustomMobileView() {
      self.querySelector('head #wm-drag-handle').remove();
      previewContainer.style.width = '';
    }

    mobileButton.addEventListener('click', addCustomMobileView)
    desktopButton.addEventListener('click', removeCustomMobileView)
    editButton.addEventListener('click', removeCustomMobileView)
  }

  handleEvent()
}())
