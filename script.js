document.addEventListener("DOMContentLoaded", function () {
  const outfitImageInput = document.getElementById("outfitImage");
  const uploadButton = document.getElementById("uploadButton");
  const outfitPreview = document.getElementById("outfitPreview");
  const form = document.getElementById("customizationForm");

  uploadButton.addEventListener("click", function () {
    outfitImageInput.click();
  });

  outfitImageInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        outfitPreview.src = e.target.result;
        outfitPreview.style.display = "block";
        outfitPreview.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    } else {
      outfitPreview.style.display = "none";
      outfitPreview.classList.add("hidden");
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      const formData = gatherFormData();
      console.log(formData);
      showSuccessMessage();
      resetForm();
    }
  });

  function validateForm() {
    const requiredFields = document.querySelectorAll(
      "#customizationForm [required]"
    );
    let allValid = true;
    requiredFields.forEach(function (field) {
      if (!field.value) {
        field.classList.add("invalid");
        allValid = false;
      } else {
        field.classList.remove("invalid");
      }
    });
    return allValid;
  }

  function gatherFormData() {
    const formData = {
      occasion: document.getElementById("occasion").value,
      purchaseType:
        document.querySelector('input[name="purchaseType"]:checked')?.value ||
        "",
      gender: document.getElementById("gender").value,
      ageGroup:
        document.querySelector('input[name="ageGroup"]:checked')?.value || "",
      religion: document.getElementById("religion").value,
      jewelryType: document.getElementById("jewelryType").value,
      budget: document.getElementById("budget").value,
      outfitImage: outfitPreview.src ? outfitPreview.src : "",
    };
    return formData;
  }

  function resetForm() {
    form.reset();
    outfitPreview.src = "";
    outfitPreview.style.display = "none";
    outfitPreview.classList.add("hidden");
  }

  function showSuccessMessage() {
    const successMessage = document.createElement("div");
    successMessage.textContent = "Form has been successfully submitted!";
    successMessage.style.backgroundColor = "#28a745";
    successMessage.style.color = "white";
    successMessage.style.padding = "10px";
    successMessage.style.borderRadius = "5px";
    successMessage.style.marginTop = "20px";
    successMessage.style.textAlign = "center";

    form.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  }
});
