enum API {
  CREATE_COIN = '/sphinx-coininfo/v1/create/coininfo',
  UPDATE_COIN = '/sphinx-coininfo/v1/update/coininfo',

  CREATE_DESCRIPTION = '/project-info-manager/v1/create/app/coin/description',
  UPDATE_DESCRIPTION = '/project-info-manager/v1/update/coin/description',
  GET_DESCRIPTIONS = '/project-info-manager/v1/get/app/coin/descriptions',

  CREATE_PRODUCT_INFO = '/project-info-manager/v1/create/app/coin/productinfo',
  UPDATE_PRODUCT_INFO = '/project-info-manager/v1/update/coin/productinfo',
  GET_PRODUCT_INFOS = '/project-info-manager/v1/get/app/coin/productinfos'
}

export {
  API
}
