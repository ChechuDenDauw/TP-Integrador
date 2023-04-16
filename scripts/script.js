
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");

if (menuBtn !== null) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("show-menu");
  });
}


const constraints = {
  name: {
    presence: { allowEmpty: false },
    length: {
      minimum: 2,
      maximum: 50,
    },
    format: {
      pattern: "[a-zA-Z ]+",
      message: "can only contain letters and spaces",
    },
  },
  email: {
    presence: { allowEmpty: false },
    email: true,
  },
  message: {
    presence: { allowEmpty: false },
    length: {
      minimum: 10,
      maximum: 1000,
    },
  },
};


const form = document.querySelector(".contact-form");


form.addEventListener("submit", function (event) {
  // Prevent the form from submitting
  event.preventDefault();

  // Get the form data
  const formData = new FormData(form);

  // Convert the form data to an object
  const data = Object.fromEntries(formData.entries());

  // Validate the form data against the constraints
  const errors = validate(data, constraints);

  // If there are errors, display them
  if (errors) {
    for (const [field, messages] of Object.entries(errors)) {
      const input = form.querySelector(`[name="${field}"]`);
      const errorElement = input.parentElement.querySelector(".error");
      errorElement.textContent = messages.join(", ");
    }
  } else {
    // Submit the form if there are no errors
    form.submit();
  }
});



const productsForm = document.querySelector('#products-form');
const summarySection = document.querySelector('#summary');


productsForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const selectedProducts = [];
  const productCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  productCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedProducts.push(checkbox.value);
    }
  });


  const prices = {
    'web-design': 500,
    'web-development': 1000,
    'mobile-app-development': 1500,
    'custom-software-development': 2000,
    'e-commerce-development': 2500,
    'cloud-solutions': 3000,
    'digital-marketing': 500,
    'seo': 1000,
  };
  let totalPrice = 0;
  selectedProducts.forEach((product) => {
    totalPrice += prices[product];
  });


  let summaryHTML = '<table><thead><tr><th>Product</th><th>Price</th></tr></thead><tbody>';
  selectedProducts.forEach((product) => {
    summaryHTML += `<tr><td>${product}</td><td>$${prices[product]}</td></tr>`;
  });
  summaryHTML += `<tr><td><strong>Total:</strong></td><td><strong>$${totalPrice}</strong></td></tr></tbody></table>`;
  summarySection.innerHTML = summaryHTML;

  const generatePdfBtn = document.createElement('button');
  generatePdfBtn.textContent = 'Generate PDF';
  generatePdfBtn.id = 'generate-pdf';
  summarySection.appendChild(generatePdfBtn);

  
  generatePdfBtn.addEventListener('click', () => {

    const doc = new jsPDF();

    doc.setFontSize(16);

    doc.text(summarySection.textContent, 10, 10);

    doc.save('web-services-summary.pdf');
  });
});
