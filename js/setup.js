'use strict';

(function () {
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_NUMBER = 4;
  var defaultEye = 0;
  var defaultCoat = 0;
  var defaultFireball = 0;

  var setup = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarListElement = setup.querySelector('.setup-similar-list');
  var wizardEye = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var fireball = setup.querySelector('.setup-fireball-wrap');

  var generateRandom = function (sum) {
    return Math.floor(Math.random() * sum);
  };

  var DesignWizard = function (name, family, coat, eyes) {
    this.name = name + ' ' + family;
    this.coatColor = coat;
    this.eyesColor = eyes;
  };

  var wizards = [];

  for (var i = 0; i < WIZARD_NUMBER; i++) {
    wizards[i] = new DesignWizard(FIRST_NAMES[generateRandom(FIRST_NAMES.length)], LAST_NAMES[generateRandom(LAST_NAMES.length)], COAT_COLORS[generateRandom(COAT_COLORS.length)], EYES_COLORS[generateRandom(EYES_COLORS.length)]);
  }

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (i = 0; i < WIZARD_NUMBER; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  setup.querySelector('.setup-similar').classList.remove('hidden');

  // Изменение настроек цветов персонажа по нажатию.

  var selectColor = function (sample, origin) {
    return origin < sample.length - 1 ? origin + 1 : 0;
  };

  wizardEye.addEventListener('click', function () {
    defaultEye = selectColor(EYES_COLORS, defaultEye);

    wizardEye.style.fill = EYES_COLORS[defaultEye];
    setup.querySelector('#eyes-color').value = EYES_COLORS[defaultEye];
  });

  wizardCoat.addEventListener('click', function () {
    defaultCoat = selectColor(COAT_COLORS, defaultCoat);

    wizardCoat.style.fill = COAT_COLORS[defaultCoat];
    setup.querySelector('#coat-color').value = COAT_COLORS[defaultCoat];
  });

  fireball.addEventListener('click', function () {
    defaultFireball = selectColor(FIREBALL_COLORS, defaultFireball);

    fireball.style.background = FIREBALL_COLORS[defaultFireball];
    setup.querySelector('#fireball-color').value = FIREBALL_COLORS[defaultFireball];
  });

// Перетаскивание предметов

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target.cloneNode(true);
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.classList.add('setup-artifacts-reach');
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.classList.add('setup-artifacts-reach');
    }
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    artifactsElement.classList.remove('setup-artifacts-reach');
    evt.target.appendChild(draggedItem);
    evt.target.style.backgroundColor = '';
    draggedItem = null;
    evt.preventDefault();
  });


  artifactsElement.addEventListener('dragenter', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      evt.target.style.backgroundColor = '';
    } else {
      evt.target.style.backgroundColor = 'yellow';
    }
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
