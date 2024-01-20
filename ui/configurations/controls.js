import checkAWBValidation from '../utils/checkAWBNumberValidation'

const CURRENCIES = [
  { value: 'INR', label: 'INR' },
  { value: 'USD', label: 'USD' },
  { value: 'GBP', label: 'GBP' },
  { value: 'EUR', label: 'EUR' },
]

const FOOTER_MAPPING = [
  { value: 'copy_12', label: 'COPY 12(FOR CUSTOMS)' },
  { value: 'copy_11', label: 'COPY 11(EXTRA COPY FOR CARRIER)' },
  { value: 'copy_10', label: 'COPY 10(EXTRA COPY FOR CARRIER)' },
  { value: 'copy_9', label: 'COPY 9(FOR AGENT)' },
  { value: 'copy_8', label: 'COPY 8(FOR FIRST CARRIER)' },
  { value: 'copy_7', label: 'COPY 7(FOR SECOND CARRIER)' },
  { value: 'copy_6', label: 'COPY 6(FOR THIRD CARRIER)' },
  { value: 'copy_5', label: 'COPY 5(FOR AIRPORT OF DESTINATION)' },
  { value: 'copy_4', label: 'COPY 4(DELIVERY RECEIPT)' },
  { value: 'original_3', label: 'ORIGINAL 3 (FOR SHIPPER)' },
  { value: 'original_2', label: 'ORIGINAL 2 (FOR CONSIGNEE)' },
  { value: 'original_1', label: 'ORIGINAL 1 (FOR ISSUING CARRIER)' },
]

const controls = ({ disableClass = false, unitDefaultValue = '' }) => ({
  main: [
    {
      name: 'documentNumber',
      label: 'Document Number',
      type: 'text',
      span: 5,
      placeholder: 'Document Number',
      rules: {
        required: 'Document Number is Required',
        validate: (value) => checkAWBValidation(value),
      },
    },
  ],
  basic: [
    {
      name: 'shipperName',
      type: 'text',
      label: "Shipper's Name",
      showOptional: false,
      placeholder: "Enter Shipper's name",
      span: 5,
      value: '',
      rules: {
        required: 'Shippers Name is Required',
      },
    },
    {
      name: 'shipperAddress',
      label: "Shipper's Address",
      type: 'textarea',
      span: 7,
      maxLength: 200,
      rows: 6,
      placeholder: 'Enter Address',
      rules: {
        required: 'Shippers Address is Required',
      },
    },
    {
      name: 'consigneeName',
      type: 'text',
      label: "Consignee's Name",
      showOptional: false,
      value: '',
      span: 5,
      placeholder: "Enter Consignee's name",
      rules: {
        required: 'Consignees Name is Required',
      },
    },
    {
      name: 'consigneeAddress',
      label: "Consignee's Address",
      type: 'textarea',
      span: 7,
      maxLength: 200,
      rows: 6,
      placeholder: 'Enter Address',
      rules: {
        required: 'Consignees Address is Required',
      },
    },
    {
      name: 'origin',
      type: 'text',
      label: 'Origin',
      placeholder: 'Enter Origin Airport',
      span: 5,
    },
    {
      name: 'destination',
      type: 'text',
      label: 'Destination',
      placeholder: 'Enter Destination Airport',
      span: 5,
    },
    {
      name: 'originPortCode',
      type: 'text',
      label: 'Origin Port Code',
      placeholder: 'Origin Port Code',
      span: 5,
      rules: {
        required: 'Origin Port Code is Required',
      },
    },
    {
      name: 'destinationPortCode',
      type: 'text',
      label: 'Destination Port Code',
      placeholder: 'Destination Port Code',
      span: 5,
      rules: {
        required: 'Destination Port Code is Required',
      },
    },
    {
      name: 'airline',
      type: 'text',
      label: 'By Carrier',
      placeholder: 'Enter Airline',
      span: 5,
      rules: {
        required: 'Carrier is Required',
      },
    },
    {
      name: 'airlineIataCode',
      type: 'text',
      label: 'Airline IATA Code',
      placeholder: 'Enter Airline IATA Code',
      span: 5,
      rules: {
        required: 'Airline IATA Code is Required',
      },
    },
    {
      name: 'paymentTerm',
      type: 'select',
      label: 'Shipment Type',
      placeholder: 'Shipment Type',
      options: [
        { value: 'prepaid', label: 'Prepaid' },
        { value: 'collect', label: 'Collect' },
      ],
      span: 5,
      rules: {
        required: 'Freight is Required',
      },
    },
    {},
    {
      name: 'to_one',
      type: 'text',
      label: 'To',
      placeholder: 'To',
      span: 2,
    },
    {
      name: 'by_one',
      type: 'text',
      label: 'By',
      placeholder: 'By',
      span: 2,
    },
    {
      name: 'to_two',
      type: 'text',
      label: 'To',
      placeholder: 'To',
      span: 2,
    },
    {
      name: 'by_two',
      type: 'text',
      label: 'By',
      placeholder: 'By',
      span: 2,
    },
  ],
  package: [
    {
      name: 'dimension',
      label: 'Dimensions (in cm)',
      type: 'fieldArray',
      span: 12,
      showButtons: true,
      noDeleteButtonTill: 1,
      value: [
        {
          length: '',
          width: '',
          height: '',
          package: '',
          unit: '',
        },
      ],
      controls: [
        {
          name: 'length',
          placeholder: 'Length',
          label: 'Length',
          type: 'number',

          span: 1.25,
          rules: {
            validate: (value) => (value < 0 ? 'Cannot be Negative' : true),
          },
        },
        {
          name: 'width',
          placeholder: 'Width',
          label: 'Width',
          type: 'number',

          span: 1.25,
          rules: {
            validate: (value) => (value < 0 ? 'Cannot be Negative' : true),
          },
        },
        {
          name: 'height',
          placeholder: 'Height',
          label: 'Height',
          type: 'number',

          span: 1.5,
          rules: {
            validate: (value) => (value < 0 ? 'Cannot be Negative' : true),
          },
        },
        {
          name: 'packages_count',
          placeholder: 'Packages count',
          label: 'Number of Packages',
          type: 'number',

          span: 2,
          rules: {
            validate: (value) => (value < 0 ? 'Cannot be Negative' : true),
          },
        },
        {
          name: 'unit',
          label: 'Unit',
          type: 'select',
          placeholder: 'select',
          span: 1.25,
          options: [
            { label: 'Cm', value: 'cms' },
            { label: 'Inch', value: 'inch' },
          ],
          value: unitDefaultValue,
        },
      ],
    },
    {
      name: 'volumetricWeight',
      type: 'number',
      label: 'Volumetric Weight',
      span: 5,
      rules: {
        required: 'Volumetric Weight is Required',
      },
    },
    {
      name: 'amountOfInsurance',
      type: 'text',
      label: 'Amount of Insurance',
      span: 5,
    },
    {},
    {
      name: 'totalPackagesCount',
      placeholder: 'Package Count',
      label: 'Package Count',
      type: 'number',
      span: 2,
      rules: {
        required: true,
        validate: (value) => (value <= 0 ? 'Should be greater than 0' : true),
      },
    },
    {
      name: 'weight',
      placeholder: 'Gross Weight',
      label: 'Gross Weight',
      type: 'number',
      span: 2,
      rules: {
        required: 'Gross Weight is Required',
        validate: (value) => (value < 0 ? 'Cannot be Negative' : true),
      },
    },
    {
      name: 'class',
      placeholder: 'Class',
      label: 'Class',
      type: 'select',
      options: [
        { value: 'q', label: 'Q' },
        { value: 'a', label: 'A' },
        { value: 'm', label: 'M' },
      ],
      span: 2,
      rules: {
        required: 'Class is Required',
      },
    },
    {
      name: 'chargeableWeight',
      placeholder: 'Chargeable Weight',
      label: 'Chargeable Weight',
      type: 'number',
      span: 2,
      rules: {
        required: 'Chargable Weight is Required',
        validate: (value) => (value < 0 ? 'Cannot be Negative' : true),
      },
    },
    {
      name: 'ratePerKg',
      type: 'number',
      label: 'Rate per Kg',
      showOptional: false,
      span: 5,
      placeholder: 'Rate per Kg',
      disabled: disableClass,
    },
    {
      name: 'currency',
      placeholder: 'Select Currency',
      type: 'select',
      span: 5,
      label: 'Currency',
      options: CURRENCIES,
      rules: {
        required: 'Currency is Required',
      },
    },
    {
      name: 'amount',
      type: 'text',
      label: 'Amount',
      span: 5,
      rules: {
        required: true,
      },
    },
    {
      name: 'remark',
      label: 'Remarks',
      type: 'textarea',
      span: 7,
      maxLength: 500,
      placeholder: 'Remarks',
      rows: 6,
    },
    {
      name: 'agentOtherCharges',
      label: 'Due Agent Charges',
      span: 5,
      type: 'fieldArray',
      showButtons: true,
      noDeleteButtonTill: 1,
      value: [
        {
          code: '',
          price: '',
        },
      ],
      controls: [
        {
          name: 'code',
          type: 'text',

          span: 5,
          placeholder: 'Enter Code',
          rules: {
            required: 'Code is Required',
          },
        },
        {
          name: 'price',
          placeholder: 'Enter Price',
          type: 'text',
          span: 5,
          rules: {
            required: 'Price is Required',
          },
        },
      ],
    },
    {
      name: 'carrierOtherCharges',
      label: 'Due Carrier Charges',
      span: 7,
      type: 'fieldArray',
      showButtons: true,
      noDeleteButtonTill: 1,
      value: [
        {
          code: '',
          chargeUnit: '',
          quantity: '',
          price: '',
        },
      ],
      controls: [
        {
          name: 'code',
          label: 'Charge Code',
          type: 'text',

          span: 2.5,
          placeholder: 'Enter Code',
          rules: {
            required: 'Code is Required',
          },
        },
        {
          name: 'chargeUnit',
          label: 'Price/Unit',
          type: 'text',

          span: 2.5,
          placeholder: 'Enter Charge Unit',
        },
        {
          name: 'quantity',
          label: 'Quantity',
          type: 'number',
          span: 2.5,
        },
        {
          name: 'price',
          label: 'Total Price',
          placeholder: 'Enter Price',
          type: 'text',
          span: 2.5,

          rules: {
            required: 'Price is Required',
          },
        },
      ],
    },
  ],
  handling: [
    {
      name: 'iataCode',
      type: 'text',
      label: "Agent's Iata Code",
      span: 5,
      rules: {
        required: 'Iata Code is Required',
      },
    },
    {
      name: 'accountingInformation',
      type: 'textarea',
      label: 'Accounting Information',
      span: 7,
      rows: 6,
      rules: {
        required: 'Accounting Information is Required',
      },
    },
    {
      name: 'declaredValueForCarriage',
      type: 'text',
      label: 'Declared Value for Carriage',
      span: 5,
    },
    {
      name: 'city',
      type: 'text',
      span: 5,
      label: 'Issuing Carrier City',
      placeholder: 'City',
      rules: {
        required: 'Carrier City is Required',
      },
    },
    {
      name: 'valueForCustom',
      type: 'text',
      label: 'Declared Value for Customs',
      showOptional: false,
      span: 5,
      placeholder: 'Enter Value For Custom',
    },
    {
      name: 'handlingInformation',
      type: 'textarea',
      label: 'Handling Information',
      showOptional: false,
      span: 5,
      rows: 6,
      placeholder: 'Handling Information',
      maxLength: 300,
    },
    {
      name: 'commodity',
      label: 'Commodity Details',
      type: 'textarea',
      span: 5,
      maxLength: 300,
      placeholder: 'Commodity...',
      rows: 6,
      rules: {
        required: 'Commodity is Required',
      },
    },
    {
      name: 'agentName',
      type: 'text',
      label: 'Agent Name',
      span: 5,
      placeholder: 'Agent Name',
      rules: {
        required: 'Agent Name is Required',
      },
    },
    {
      name: 'shipperSignature',
      type: 'text',
      label: 'Signature of Shipper or his Agent',
      span: 5,
      placeholder: 'Shipper Signature',
      rules: { required: 'Shipper Signature is Required' },
    },
    {
      name: 'place',
      type: 'text',
      label: 'At Place',
      span: 5,
      placeholder: 'Place',
      rules: {
        required: 'Place is Required',
      },
    },
    {
      name: 'executedDate',
      type: 'date_picker',
      label: 'Executed Date',
      span: 5,
      placeholder: 'Date',
      value: new Date(),
      isPreviousDaysAllowed: true,
      rules: {
        required: 'Date is Required',
      },
    },
    {
      name: 'copyType',
      type: 'select',
      options: FOOTER_MAPPING,
      label: 'Copy Type',
      placeholder: 'Enter Copy Type',
      span: 5,
    },
  ],
})

export default controls
