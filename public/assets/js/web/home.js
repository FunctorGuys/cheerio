$(() => {
  const handleMultipleFiles = (e) => {
    const $fileInput = $(e.currentTarget);
    const files = $fileInput.prop('files');
    const filesMapToElement = Array.from(files).map((f, i) => `
      <p class="u-mgb-5">${f.name}</p>
    `);

    $fileInput.siblings('.js-show-files').html(filesMapToElement);
  };

  const binding = () => {
    $('.js-multiple-files').on('change', handleMultipleFiles);
  };

  binding();
});
