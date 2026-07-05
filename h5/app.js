(function () {
  let selectedRating = 0;

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    applyHeroBackground();
    renderSiteInfo();
    renderFeatures();
    renderCourses();
    populateCourseSelect();
    bindOverlay();
    bindForms();
    bindRating();
    bindSmoothScroll();
  }

  function applyHeroBackground() {
    if (siteInfo.heroImage) {
      const hero = document.getElementById("hero");
      const img = new Image();
      img.onload = function () {
        hero.style.backgroundImage =
          "linear-gradient(160deg, rgba(26,58,92,0.88) 0%, rgba(42,82,152,0.85) 100%), url('" + siteInfo.heroImage + "')";
        hero.style.backgroundSize = "cover";
        hero.style.backgroundPosition = "center";
      };
      img.src = siteInfo.heroImage;
    }
  }

  function loadImageHtml(src, alt, className) {
    if (!src) return "";
    return (
      '<img class="' + className + '" src="' + escapeHtml(src) + '" alt="' + escapeHtml(alt) + '" loading="lazy" onerror="this.hidden=true">'
    );
  }

  function renderSiteInfo() {
    document.getElementById("siteName").textContent = siteInfo.name;
    document.getElementById("siteSlogan").textContent = siteInfo.slogan;
    document.getElementById("siteTagline").textContent = siteInfo.tagline;
    document.getElementById("footerName").textContent = siteInfo.name;
    document.getElementById("footerPhone").textContent = "电话：" + siteInfo.phone;
    document.getElementById("footerEmail").textContent = "邮箱：" + siteInfo.email;
    document.getElementById("footerAddress").textContent = "地址：" + siteInfo.address;

    const logoEl = document.getElementById("siteLogo");
    if (siteInfo.logo) {
      logoEl.src = siteInfo.logo;
      logoEl.alt = siteInfo.name;
      logoEl.hidden = false;
      logoEl.onerror = function () {
        logoEl.hidden = true;
      };
    }

    const aboutEl = document.getElementById("aboutText");
    aboutEl.innerHTML = siteInfo.about.map(function (p) {
      return "<p>" + escapeHtml(p) + "</p>";
    }).join("");
  }

  function renderFeatures() {
    const grid = document.getElementById("featureGrid");
    grid.innerHTML = siteInfo.features.map(function (f) {
      return (
        '<div class="feature-card">' +
          '<div class="feature-icon">' + f.icon + '</div>' +
          "<h3>" + escapeHtml(f.title) + "</h3>" +
          "<p>" + escapeHtml(f.desc) + "</p>" +
        "</div>"
      );
    }).join("");
  }

  function renderCourses() {
    const list = document.getElementById("courseList");
    list.innerHTML = courses.map(function (course) {
      return (
        '<article class="course-card" data-id="' + course.id + '" tabindex="0" role="button">' +
          loadImageHtml(course.image, course.title, "course-cover") +
          '<div class="course-card-header">' +
            "<h3>" + escapeHtml(course.title) + "</h3>" +
            '<span class="course-badge">' + escapeHtml(course.format) + "</span>" +
          "</div>" +
          '<p class="course-summary">' + escapeHtml(course.summary) + "</p>" +
          '<div class="course-meta">' +
            "<span>👤 " + escapeHtml(course.age) + "</span>" +
            "<span>⏱ " + escapeHtml(course.duration) + "</span>" +
          "</div>" +
          '<p class="course-card-arrow">查看详情 →</p>' +
        "</article>"
      );
    }).join("");

    list.querySelectorAll(".course-card").forEach(function (card) {
      card.addEventListener("click", function () {
        openDetail(card.dataset.id);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDetail(card.dataset.id);
        }
      });
    });
  }

  function populateCourseSelect() {
    const select = document.getElementById("regCourse");
    courses.forEach(function (course) {
      const opt = document.createElement("option");
      opt.value = course.id;
      opt.textContent = course.title;
      select.appendChild(opt);
    });
  }

  function openDetail(courseId) {
    const course = courses.find(function (c) { return c.id === courseId; });
    if (!course) return;

    const content = document.getElementById("detailContent");
    content.innerHTML =
      loadImageHtml(course.image, course.title, "detail-cover") +
      "<h2 id=\"detailTitle\">" + escapeHtml(course.title) + "</h2>" +
      '<div class="detail-meta">' +
        "<span>适合年龄：" + escapeHtml(course.age) + "</span>" +
        "<span>课时：" + escapeHtml(course.duration) + "</span>" +
        "<span>形式：" + escapeHtml(course.format) + "</span>" +
      "</div>" +
      "<p>" + escapeHtml(course.detail) + "</p>" +
      "<h3>课程亮点</h3>" +
      '<ul class="detail-highlights">' +
        course.highlights.map(function (h) {
          return "<li>" + escapeHtml(h) + "</li>";
        }).join("") +
      "</ul>" +
      '<button type="button" class="btn btn-primary btn-block" id="detailRegisterBtn" data-id="' + course.id + '">报名此课程</button>';

    document.getElementById("detailRegisterBtn").addEventListener("click", function () {
      closeDetail();
      scrollToRegister(course.id);
    });

    const overlay = document.getElementById("courseOverlay");
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDetail() {
    const overlay = document.getElementById("courseOverlay");
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function bindOverlay() {
    document.getElementById("detailClose").addEventListener("click", closeDetail);
    document.getElementById("overlayBackdrop").addEventListener("click", closeDetail);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDetail();
    });
  }

  function scrollToRegister(courseId) {
    if (courseId) {
      document.getElementById("regCourse").value = courseId;
    }
    document.getElementById("register").scrollIntoView({ behavior: "smooth" });
  }

  function bindSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  function bindRating() {
    document.querySelectorAll(".rating-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectedRating = parseInt(btn.dataset.value, 10);
        document.querySelectorAll(".rating-btn").forEach(function (b) {
          b.classList.toggle("active", parseInt(b.dataset.value, 10) <= selectedRating);
        });
        clearFieldError("rating");
      });
    });
  }

  function bindForms() {
    document.getElementById("registerForm").addEventListener("submit", handleRegister);
    document.getElementById("feedbackForm").addEventListener("submit", handleFeedback);
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!validateRegister()) return;

    const btn = document.getElementById("regSubmitBtn");
    btn.disabled = true;
    btn.textContent = "提交中…";

    const courseSelect = document.getElementById("regCourse");
    const courseOption = courseSelect.options[courseSelect.selectedIndex];

    const data = {
      name: document.getElementById("regName").value.trim(),
      phone: document.getElementById("regPhone").value.trim(),
      email: document.getElementById("regEmail").value.trim(),
      grade: document.getElementById("regGrade").value.trim(),
      courseId: courseSelect.value,
      courseTitle: courseOption.textContent,
      note: document.getElementById("regNote").value.trim(),
    };

    try {
      await submitRegistration(data);
      showToast("报名提交成功，我们将尽快与您联系！");
      e.target.reset();
    } catch (err) {
      showToast(err.message || "提交失败，请稍后重试", true);
    } finally {
      btn.disabled = false;
      btn.textContent = "提交报名";
    }
  }

  async function handleFeedback(e) {
    e.preventDefault();
    if (!validateFeedback()) return;

    const btn = document.getElementById("fbSubmitBtn");
    btn.disabled = true;
    btn.textContent = "提交中…";

    const data = {
      name: document.getElementById("fbName").value.trim(),
      contact: document.getElementById("fbContact").value.trim(),
      rating: selectedRating,
      message: document.getElementById("fbMessage").value.trim(),
    };

    try {
      await submitFeedback(data);
      showToast("感谢您的反馈！");
      e.target.reset();
      selectedRating = 0;
      document.querySelectorAll(".rating-btn").forEach(function (b) {
        b.classList.remove("active");
      });
    } catch (err) {
      showToast(err.message || "提交失败，请稍后重试", true);
    } finally {
      btn.disabled = false;
      btn.textContent = "提交反馈";
    }
  }

  function validateRegister() {
    let valid = true;

    const name = document.getElementById("regName");
    if (!name.value.trim()) {
      setFieldError("regName", "请输入姓名");
      valid = false;
    } else {
      clearFieldError("regName");
    }

    const phone = document.getElementById("regPhone");
    if (!phone.value.trim()) {
      setFieldError("regPhone", "请输入联系电话");
      valid = false;
    } else if (!/^1[3-9]\d{9}$/.test(phone.value.trim())) {
      setFieldError("regPhone", "请输入有效的手机号");
      valid = false;
    } else {
      clearFieldError("regPhone");
    }

    const email = document.getElementById("regEmail");
    if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      setFieldError("regEmail", "请输入有效的邮箱地址");
      valid = false;
    } else {
      clearFieldError("regEmail");
    }

    const grade = document.getElementById("regGrade");
    if (!grade.value.trim()) {
      setFieldError("regGrade", "请输入学员年龄或年级");
      valid = false;
    } else {
      clearFieldError("regGrade");
    }

    const course = document.getElementById("regCourse");
    if (!course.value) {
      setFieldError("regCourse", "请选择意向课程");
      valid = false;
    } else {
      clearFieldError("regCourse");
    }

    return valid;
  }

  function validateFeedback() {
    let valid = true;

    if (!selectedRating) {
      setFieldError("rating", "请选择体验评分");
      valid = false;
    } else {
      clearFieldError("rating");
    }

    const message = document.getElementById("fbMessage");
    if (!message.value.trim()) {
      setFieldError("fbMessage", "请输入留言内容");
      valid = false;
    } else {
      clearFieldError("fbMessage");
    }

    return valid;
  }

  function setFieldError(fieldId, msg) {
    const input = document.getElementById(fieldId);
    if (input) input.classList.add("error");
    const errEl = document.querySelector('.field-error[data-for="' + fieldId + '"]');
    if (errEl) errEl.textContent = msg;
  }

  function clearFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    if (input) input.classList.remove("error");
    const errEl = document.querySelector('.field-error[data-for="' + fieldId + '"]');
    if (errEl) errEl.textContent = "";
  }

  function showToast(message, isError) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.toggle("error", !!isError);
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 3000);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
})();
