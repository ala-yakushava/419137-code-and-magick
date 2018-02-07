'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
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
  wizards[i] = new DesignWizard(FIRST_NAMES[generateRandom(FIRST_NAMES.length)], LAST_NAMES[generateRandom(LAST_NAMES.length)], COAT_COLOR[generateRandom(COAT_COLOR.length)], EYES_COLOR[generateRandom(EYES_COLOR.length)]);
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

var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function() {
  openPopup();
});

setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function() {
  closePopup();
});

setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

inputName.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ESC_KEYCODE)
    event.stopPropagation();
});

// Изменение настроек цветов персонажа по нажатию.

var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var fireball = setup.querySelector('.setup-fireball-wrap');
var defaultEyes = 0;
var defaultCoat = 0;
var defaultFireball = 0;

var selectEyes = function () {
  if (defaultEyes < EYES_COLOR.length - 1) {
    defaultEyes++;
  } else {
    defaultEyes = 0;
  }

  wizardEyes.style.fill = EYES_COLOR[defaultEyes];
  setup.querySelector('#eyes-color').setAttribute('value', EYES_COLOR[defaultEyes]);
};

var selectCoat = function () {
  if (defaultCoat < COAT_COLOR.length - 1) {
    defaultCoat++;
  } else {
    defaultCoat = 0;
  }

  wizardCoat.style.fill = COAT_COLOR[defaultCoat];
  setup.querySelector('#coat-color').setAttribute('value', COAT_COLOR[defaultEyes]);
};

var selectFireball = function () {
  if (defaultFireball < FIREBALL_COLOR.length - 1) {
    defaultFireball++;
  } else {
    defaultFireball = 0;
  }

  fireball.style.background = FIREBALL_COLOR[defaultFireball];
  setup.querySelector('#fireball-color').setAttribute('value', FIREBALL_COLOR[defaultEyes]);
};

wizardEyes.addEventListener('click', function () {
  selectEyes();
});

wizardCoat.addEventListener('click', function () {
  selectCoat();
});

fireball.addEventListener('click', function () {
  selectFireball();
});
