module.exports = {
  extends: [
    'eslint-config-airbnb-base',
  ],
  env: {
    browser: true,
  },
  rules: {
    "import/prefer-default-export": [
        ( "off" | "warn" | "error" ),
        { "target": "any" }
    ]
}

};
