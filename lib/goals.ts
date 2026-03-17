export const GOALS = {
  // Конверсионные цели (отправка форм)
  FORM_CUSTOM_ORDER: "form_custom_order",
  FORM_BRAND_PROJECT: "form_brand_project",
  FORM_EVENT: "form_event",
  FORM_CONTACT: "form_contact",
  FORM_CHECKOUT: "form_checkout",

  // E-commerce
  ADD_TO_CART: "add_to_cart",
  CHECKOUT_START: "checkout_start",
  PAYMENT_SUCCESS: "payment_success",

  // Мессенджеры / звонки / email
  CLICK_TELEGRAM: "click_telegram",
  CLICK_WHATSAPP: "click_whatsapp",
  CLICK_PHONE: "click_phone",
  CLICK_EMAIL: "click_email",

  // Поведенческие цели
  VISIT_PLACE_ORDER: "visit_place_order",
  VISIT_PROJECTS: "visit_projects",
  VISIT_LIVE_CUSTOMIZATION: "visit_live_customization",
  VISIT_SHOP: "visit_shop",
  VISIT_CONTACTS: "visit_contacts",
  VISIT_ABOUT: "visit_about",
  OPEN_MODAL_PROJECT: "open_modal_project",
  OPEN_MODAL_EVENT: "open_modal_event",
} as const

export type GoalName = (typeof GOALS)[keyof typeof GOALS]
