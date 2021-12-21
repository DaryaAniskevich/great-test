const openModal = () => {
  const input = document.querySelector(".form-block-form__input");
  const button = document.querySelector(".form-block-form__button");
  const modal = document.querySelector(".modal");

  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal_active") ||
      e.target.classList.contains("modal-wrapper") ||
      e.target.classList.contains("modal__button")
    ) {
      modal.classList.remove("modal_active");
      input.value = "";
      input.style.border = "1px solid transparent";
    }
  });
  button.addEventListener("click", (e) => {
    e.preventDefault();
    if (input.value.length > 0) {
      modal.classList.add("modal_active");
      setTimeout(() => {
        modal.classList.remove("modal_active");
      }, 5000);
    } else {
      input.style.border = "1px solid red";
    }
  });

  input.addEventListener("click", () => {
    input.style.border = "1px solid transparent";
  });
};

openModal();

const sliderBanner = () => {
  const slides = document.querySelectorAll(".slider__item");
  const slidesBlock = document.querySelector(".slider-wrapper");
  const paginationBlock = document.querySelector(".slider-pagination");
  const paginationItem = document.querySelectorAll(".slider-pagination__item");

  let count = 0;
  let width;

  const rollSlider = (count) => {
    slidesBlock.style.transform = `translate(-${count * width}px)`;
  };

  const calculateSliderWidth = () => {
    width = document.querySelector(".slider").offsetWidth;
    slidesBlock.style.width = width * slides.length + "px";
  };
  calculateSliderWidth();

  window.addEventListener("resize", () => {
    calculateSliderWidth();
  });

  const changeActivePaginationItem = () => {
    paginationItem.forEach((item) => {
      if (item.id == count) {
        item.innerHTML = `<div class="slider-pagination__item_active"></div>`;
      } else {
        item.innerHTML = "";
      }
    });
  };

  const autoSlider = setInterval(() => {
    count++;
    if (count >= slides.length) {
      count = 0;
    }
    changeActivePaginationItem();
    rollSlider(count);
  }, 5000);

  slides.forEach((slide) => {
    slide.addEventListener("click", () => clearInterval(autoSlider));
  });

  let x1 = null;
  let y1 = null;

  const handleTouchStart = (event) => {
    const firstTouch = event.touches[0];
    x1 = firstTouch.clientX;
    y1 = firstTouch.clientY;
  };

  const handleTouchMove = (event) => {
    if (!x1 || !y1) {
      return false;
    }
    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY;

    let xDiff = x2 - x1;
    let yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      clearInterval(autoSlider);
      if (xDiff > 0) {
        count--;
        if (count <= 0) {
          count = 0;
        }
      } else {
        count++;
        if (count >= slides.length) {
          count = 0;
        }
      }
      changeActivePaginationItem();
      rollSlider(count);
    }
    x1 = null;
    y1 = null;

    return;
  };

  slidesBlock.addEventListener("touchstart", handleTouchStart, false);
  slidesBlock.addEventListener("touchmove", handleTouchMove, false);

  paginationBlock.addEventListener("click", (event) => {
    if (event.target.classList.contains("banner-pagination__item")) {
      paginationItem.forEach((item) => {
        if (event.target.id == item.id) {
          count = item.id;
          item.innerHTML = `<div class="slider-pagination__item_active"></div>`;
        } else {
          item.innerHTML = "";
        }
      });
      rollSlider(count);
    }
  });
};

sliderBanner();
