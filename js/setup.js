'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_NUMBER = 4;

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

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

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Открытие/закрытие окна настройки персонажа.

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var inputName = setup.querySelector('.setup-user-name');

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

inputName.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

// Изменение настроек цветов персонажа по нажатию.

var defaultEye = 0;
var defaultCoat = 0;
var defaultFireball = 0;

var wizardEye = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var fireball = setup.querySelector('.setup-fireball-wrap');

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
