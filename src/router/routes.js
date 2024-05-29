const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      title: 'pages.home.title',
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { title: 'Sākums' },
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/dagda',
        name: 'dagda',
        meta: { title: 'Dagda' },
        component: () => import('@/views/jl21080/dagda.vue'),
      },
      {
        path: '/dagdabd',
        name: 'dagdabd',
        meta: { title: 'Dagdas bērnu dārzs' },
        component: () => import('@/views/jl21080/dagdabd.vue'),
      },
      {
        path: '/dagdavsk',
        name: 'dagdavsk',
        meta: { title: 'Dagdas vidusskola' },
        component: () => import('@/views/jl21080/dagdavsk.vue'),
      },
      {
        path: '/riga',
        name: 'riga',
        meta: { title: 'Rīga' },
        component: () => import('@/views/jl21080/riga.vue'),
      },
      {
        path: '/lu',
        name: 'lu',
        meta: { title: 'Latvijas Universitāte' },
        component: () => import('@/views/jl21080/lu.vue'),
      },
      {
        path: '/dagdahome',
        name: 'dagdahome',
        meta: { title: 'Mājas Dagdā' },
        component: () => import('@/views/jl21080/dagdahome.vue'),
      },
      {
        path: '/rigahome',
        name: 'rigahome',
        meta: { title: 'Mājas Rīgā' },
        component: () => import('@/views/jl21080/rigahome.vue'),
      },
      {
        path: '/login',
        name: 'login',
        meta: { title: 'pages.login.title' },
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/signin',
        name: 'signin',
        meta: { title: 'pages.signin.title' },
        component: () => import('@/views/SignIn.vue'),
      },
      {
        path: '/role-selection',
        name: 'roleSelection',
        meta: { title: 'pages.roleSelection.title' },
        component: () => import('@/views/RoleSelect.vue'),
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: 'pages.dashboard.title',
          anonymous: true,
        },
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/secure',
        name: 'secureDemo',
        meta: {
          title: 'pages.secureDemo.title',
          scope: ['game/list'],
          state: 'authorized',
        },
        component: () => import('@/views/SecureView.vue'),
      },
      {
        path: '/utility',
        name: 'utility',
        meta: {
          title: 'pages.utility.title',
          anonymous: true,
        },
        component: () => import('@/views/Utility.vue'),
      },
      {
        path: '/sandbox',
        name: 'sandbox',
        meta: {
          title: 'pages.sandbox.title',
          anonymous: true,
        },
        component: () => import('@/views/Sandbox.vue'),
      },
      {
        path: '/showroom',
        name: 'showroom',
        meta: {
          title: 'pages.showroom.title',
          anonymous: true,
        },
        component: () => import('@/views/ShowRoom.vue'),
      },
      {
        path: '/esign',
        name: 'esign',
        meta: {
          title: 'pages.esign.title',
          anonymous: true,
        },
        component: () => import('@/views/ESign.vue'),
      },
      {
        path: '/signDone/:id',
        name: 'signDone',
        meta: {
          title: 'pages.esign.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.esign.title',
              to: { name: 'esign' },
            },
          ],
        },
        component: () => import('@/views/SignDone.vue'),
      },
      {
        path: '/forms',
        name: 'forms',
        meta: {
          title: 'pages.forms.title',
          anonymous: true,
        },
        component: () => import('@/views/guidelines/Forms.vue'),
      },
      {
        path: '/forms/anatomy',
        name: 'formsAnatomy',
        meta: {
          title: 'pages.forms.anatomy.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.forms.title',
              to: { name: 'forms' },
            },
          ],
        },
        component: () => import('@/views/guidelines/forms/Anatomy.vue'),
      },
      {
        path: '/forms/layout',
        name: 'formsLayout',
        meta: {
          title: 'pages.forms.layout.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.forms.title',
              to: { name: 'forms' },
            },
          ],
        },
        component: () => import('@/views/guidelines/forms/Layout.vue'),
      },
      {
        path: '/forms/index',
        name: 'formsIndex',
        meta: {
          title: 'pages.forms.index.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.forms.title',
              to: { name: 'forms' },
            },
          ],
        },
        component: () => import('@/views/guidelines/forms/Index.vue'),
      },
      {
        path: '/forms/builder',
        name: 'formBuilder',
        meta: {
          title: 'pages.forms.builder.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.forms.title',
              to: { name: 'forms' },
            },
          ],
        },
        component: () => import('@/views/guidelines/forms/Builder.vue'),
      },
      {
        path: '/sandbox/info-wrapper',
        name: 'infoWrapper',
        meta: {
          title: 'pages.infoWrapper.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/InfoWrapper.vue'),
      },
      {
        path: '/sandbox/info-wrapper/guidelines',
        name: 'infoWrapperGuidelines',
        meta: {
          title: 'pages.infoWrapper.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/InfoWrapper.vue'),
      },
      {
        path: '/sandbox/button',
        name: 'button',
        meta: {
          title: 'pages.button.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/Button.vue'),
      },
      {
        path: '/sandbox/button/guidelines',
        name: 'buttonGuidelines',
        meta: {
          title: 'pages.button.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/Button.vue'),
      },
      {
        path: '/sandbox/flag',
        name: 'flag',
        meta: {
          title: 'pages.flag.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/Flag.vue'),
      },
      {
        path: '/sandbox/flag/guidelines',
        name: 'flagGuidelines',
        meta: {
          title: 'pages.flag.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/Flag.vue'),
      },
      {
        path: '/sandbox/icon',
        name: 'icon',
        meta: {
          title: 'pages.icon.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/Icon.vue'),
      },
      {
        path: '/sandbox/icon/guidelines',
        name: 'iconGuidelines',
        meta: {
          title: 'pages.icon.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/Icon.vue'),
      },
      {
        path: '/sandbox/content-switcher',
        name: 'contentSwitcher',
        meta: {
          title: 'pages.contentSwitcher.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/ContentSwitcher.vue'),
      },
      {
        path: '/sandbox/content-switcher/guidelines',
        name: 'contentSwitcherGuidelines',
        meta: {
          title: 'pages.contentSwitcher.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/ContentSwitcher.vue'),
      },
      {
        path: '/sandbox/list',
        name: 'list',
        meta: {
          title: 'pages.list.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/List.vue'),
      },
      {
        path: '/sandbox/list/example',
        name: 'apiList',
        meta: {
          title: 'pages.list.title',
          scope: ['game/list'],
          state: 'authorized',
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/APIData/List.vue'),
      },
      {
        path: '/sandbox/list/guidelines',
        name: 'listGuidelines',
        meta: {
          title: 'pages.list.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/List.vue'),
      },
      {
        path: '/sandbox/text-input',
        name: 'textInput',
        meta: {
          title: 'pages.textInput.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/TextInput.vue'),
      },
      {
        path: '/sandbox/text-input/guidelines',
        name: 'textInputGuidelines',
        meta: {
          title: 'pages.textInput.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/TextInput.vue'),
      },
      {
        path: '/sandbox/modal',
        name: 'modal',
        meta: {
          title: 'pages.modal.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/Modal.vue'),
      },
      {
        path: '/sandbox/modal/guidelines',
        name: 'modalGuidelines',
        meta: {
          title: 'pages.modal.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/Modal.vue'),
      },
      {
        path: '/sandbox/date-time-picker',
        name: 'dateTimePicker',
        meta: {
          title: 'pages.dateTimePicker.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/DateTimePicker.vue'),
      },
      {
        path: '/sandbox/date-time-picker/guidelines',
        name: 'dateTimePickerGuidelines',
        meta: {
          title: 'pages.dateTimePicker.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/DateTimePicker.vue'),
      },
      {
        path: '/sandbox/markdown-text-area',
        name: 'markdownTextArea',
        meta: {
          title: 'pages.markdownTextArea.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/MarkdownTextArea.vue'),
      },
      {
        path: '/sandbox/markdown-text-area/guidelines',
        name: 'markdownTextAreaGuidelines',
        meta: {
          title: 'pages.markdownTextArea.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/MarkdownTextArea.vue'),
      },
      {
        path: '/sandbox/master-detail',
        name: 'masterDetail',
        meta: {
          title: 'pages.masterDetail.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/MasterDetail.vue'),
      },
      {
        path: '/sandbox/master-detail/guidelines',
        name: 'masterDetailGuidelines',
        meta: {
          title: 'pages.masterDetail.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/MasterDetail.vue'),
      },
      {
        path: '/sandbox/drop-down',
        name: 'dropDown',
        meta: {
          title: 'pages.dropDown.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/DropDown.vue'),
      },
      {
        path: '/sandbox/drop-down/guidelines',
        name: 'dropDownGuidelines',
        meta: {
          title: 'pages.dropDown.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/DropDown.vue'),
      },
      {
        path: '/sandbox/drop-down-menu',
        name: 'dropDownMenu',
        meta: {
          title: 'pages.dropDownMenu.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/DropDownMenu.vue'),
      },
      {
        path: '/sandbox/drop-down-menu/guidelines',
        name: 'dropDownMenuGuidelines',
        meta: {
          title: 'pages.dropDownMenu.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/DropDownMenu.vue'),
      },
      {
        path: '/sandbox/number-slider',
        name: 'numberSlider',
        meta: {
          title: 'pages.numberSlider.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/NumberSlider.vue'),
      },
      {
        path: '/sandbox/number-slider/guidelines',
        name: 'numberSliderGuidelines',
        meta: {
          title: 'pages.numberSlider.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/NumberSlider.vue'),
      },
      {
        path: '/sandbox/steps',
        name: 'steps',
        meta: {
          title: 'pages.steps.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/Steps.vue'),
      },
      {
        path: '/sandbox/steps/guidelines',
        name: 'stepsGuidelines',
        meta: {
          title: 'pages.steps.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/Steps.vue'),
      },
      {
        path: '/sandbox/text-area',
        name: 'textArea',
        meta: {
          title: 'pages.textArea.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/TextArea.vue'),
      },
      {
        path: '/sandbox/text-area/guidelines',
        name: 'textAreaGuidelines',
        meta: {
          title: 'pages.textArea.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/TextArea.vue'),
      },
      {
        path: '/sandbox/value-picker',
        name: 'valuePicker',
        meta: {
          title: 'pages.valuePicker.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/ValuePicker.vue'),
      },
      {
        path: '/sandbox/value-picker/guidelines',
        name: 'valuePickerGuidelines',
        meta: {
          title: 'pages.valuePicker.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/ValuePicker.vue'),
      },
      {
        path: '/sandbox/auto-complete',
        name: 'autoComplete',
        meta: {
          title: 'pages.autoComplete.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/AutoComplete.vue'),
      },
      {
        path: '/sandbox/auto-complete/guidelines',
        name: 'autoCompleteGuidelines',
        meta: {
          title: 'pages.autoComplete.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/AutoComplete.vue'),
      },
      {
        path: '/sandbox/filters',
        name: 'filters',
        meta: {
          title: 'pages.filters.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/Filters.vue'),
      },
      {
        path: '/sandbox/filters/guidelines',
        name: 'filtersGuidelines',
        meta: {
          title: 'pages.filters.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/Filters.vue'),
      },
      {
        path: '/sandbox/data-grid',
        name: 'dataGrid',
        meta: {
          title: 'pages.dataGrid.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/DataGrid.vue'),
      },
      {
        path: '/sandbox/data-grid/example',
        name: 'apiDataGrid',
        meta: {
          title: 'pages.dataGrid.title',
          scope: ['game/list'],
          state: 'authorized',
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/APIData/DataGrid.vue'),
      },
      {
        path: '/sandbox/data-grid/guidelines',
        name: 'dataGridGuidelines',
        meta: {
          title: 'pages.dataGrid.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/DataGrid.vue'),
      },
      {
        path: '/icons',
        name: 'icons',
        meta: {
          title: 'pages.icons.title',
          anonymous: true,
        },
        component: () => import('@/views/Icons.vue'),
      },
      {
        path: '/sandbox/data-block',
        name: 'dataBlock',
        meta: {
          title: 'pages.dataBlock.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/DataBlock.vue'),
      },
      {
        path: '/sandbox/data-block/guidelines',
        name: 'dataBlockGuidelines',
        meta: {
          title: 'pages.dataBlock.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/DataBlock.vue'),
      },
      {
        path: '/sandbox/expander',
        name: 'expander',
        meta: {
          title: 'pages.expander.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/Expander.vue'),
      },
      {
        path: '/sandbox/expander/guidelines',
        name: 'expanderGuidelines',
        meta: {
          title: 'pages.expander.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/Expander.vue'),
      },
      {
        path: '/sandbox/file-uploader',
        name: 'fileUploader',
        meta: {
          title: 'pages.fileUploader.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/FileUploader.vue'),
      },
      {
        path: '/sandbox/checkbox',
        name: 'checkbox',
        meta: {
          title: 'pages.checkbox.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/Checkbox.vue'),
      },
      {
        path: '/sandbox/button/guidelines',
        name: 'checkboxGuidelines',
        meta: {
          title: 'pages.checkbox.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/Checkbox.vue'),
      },
      {
        path: '/sandbox/radio-button',
        name: 'radioButton',
        meta: {
          title: 'pages.radioButton.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/RadioButton.vue'),
      },
      {
        path: '/sandbox/radio-button/guidelines',
        name: 'radioButtonGuidelines',
        meta: {
          title: 'pages.radioButton.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/RadioButton.vue'),
      },
      {
        path: '/sandbox/state-display',
        name: 'stateDisplay',
        meta: {
          title: 'pages.stateDisplay.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/StateDisplay.vue'),
      },
      {
        path: '/sandbox/person-display',
        name: 'personDisplay',
        meta: {
          title: 'pages.personDisplay.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/PersonDisplay.vue'),
      },
      {
        path: '/sandbox/state-display/guidelines',
        name: 'stateDisplayGuidelines',
        meta: {
          title: 'pages.stateDisplay.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/StateDisplay.vue'),
      },
      {
        path: '/sandbox/date-time-range',
        name: 'dateTimeRange',
        meta: {
          title: 'pages.dateTimeRange.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/DateTimeRange.vue'),
      },
      {
        path: '/sandbox/date-time-range/guidelines',
        name: 'dateTimeRangeGuidelines',
        meta: {
          title: 'pages.dateTimeRange.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/DateTimeRange.vue'),
      },
      {
        path: '/sandbox/error-page',
        name: 'errorPage',
        meta: {
          title: 'pages.errorPage.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/ErrorPage.vue'),
      },
      {
        path: '/sandbox/error-page/guidelines',
        name: 'errorPageGuidelines',
        meta: {
          title: 'pages.errorPage.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/ErrorPage.vue'),
      },
      {
        path: '/sandbox/toggle',
        name: 'toggle',
        meta: {
          title: 'pages.toggle.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/Toggle.vue'),
      },
      {
        path: '/sandbox/toggle/guidelines',
        name: 'toggleGuidelines',
        meta: {
          title: 'pages.toggle.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/guidelines/Toggle.vue'),
      },
      {
        path: '/sandbox/appendable-list',
        name: 'appendableList',
        meta: {
          title: 'pages.appendableList.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/AppendableList.vue'),
      },
      {
        path: '/sandbox/map',
        name: 'map',
        meta: {
          title: 'pages.map.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/Map.vue'),
      },
      {
        path: '/sandbox/loader',
        name: 'loader',
        meta: {
          title: 'pages.loader.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/Loader.vue'),
      },
      {
        path: '/sandbox/qr-scanner',
        name: 'qrScanner',
        meta: {
          title: 'pages.qrScanner.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/QrScanner.vue'),
      },
      {
        path: '/sandbox/qr-scanner-check',
        name: 'qrScannerCheck',
        meta: {
          title: 'pages.qrScanner.title',
          anonymous: true,
          breadcrumbs: [
            {
              text: 'pages.sandbox.title',
              to: { name: 'sandbox' },
            },
          ],
        },
        component: () => import('@/views/QrScannerCheck.vue'),
      },
      {
        path: '/user/profile',
        name: 'userProfile',
        meta: {
          title: 'pages.userProfile.title',
          anonymous: true,
        },
        component: () => import('@/views/UserProfile.vue'),
      },
      {
        path: 'users',
        component: {
          template: '<div>Userf asdf safsd f sagdsa gsds</div>',
        },
        meta: { title: 'pages.users.title', state: 'authorized' },
      },
      {
        path: '/error',
        name: 'error',
        component: () => import('@/views/Error404.vue'),
        meta: { title: ' ', anonymous: true },
      },
      {
        path: '/forbidden',
        name: 'forbidden',
        component: () => import('@/views/Error403.vue'),
        meta: { title: ' ', anonymous: true },
      },
      {
        path: '/not-authorized',
        name: 'notAuthorized',
        component: () => import('@/views/Error401.vue'),
        meta: { title: ' ', anonymous: true },
      },
      {
        path: '/sessionEnded',
        name: 'sessionEnded',
        component: () => import('@/views/SessionEnded.vue'),
        meta: { title: 'pages.sessionEnded.title', anonymous: true },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        alias: '/notFound',
        meta: { title: 'pages.users.title', anonymous: true },
        component: () => import('@/views/NotFound.vue'),
      },

      {
        path: '/auth-done',
        name: 'authDone',
        component: () => import('@/views/AuthDone.vue'),
        meta: { title: 'pages.auth.title', anonymous: true },
      },
    ],
  },
];

export default routes;
