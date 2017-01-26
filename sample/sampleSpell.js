export const name = 'Clear';
export const description = 'Removes all entities from the tenant (including webtasks/extensions) and puts settings back to their defaults';

export const cast = (spell, bag) => spell
  .message('Starting the spell. Here\'s my bag:', bag);

  // .loadBag({
  //   hostedPasswordResetHtml: 'templates/hosted/password_reset.html',
  //   hostedGuardianMfaHtml: 'templates/hosted/guardian_multifactor.html',
  //   hostedLoginHtml: 'templates/hosted/login.html',
  //   blockedAccountEmailHtml: 'templates/email/blocked_account.html',
  //   resetEmailHtml: 'templates/email/reset_email.html',
  //   stolenCredentialsEmailHtml: 'templates/email/stolen_credentials.html',
  //   verifyEmailHtml: 'templates/email/verify_email.html',
  //   welcomeEmailHtml: 'templates/email/welcome_email.html'
  // })

  // .deleteAllUsers()
  // .deleteAllConnections()
  // .deleteAllClientGrants()
  // .deleteAllAPIs()
  // .deleteAllClients()

  // .parallel([
  //   spell.deleteAllRules(),

  //   spell.deleteEmailProvider(),

  //   spell.updateTenantSettings({
  //     change_password: {
  //       enabled: false,
  //       html: bag.hostedPasswordResetHtml
  //     },
  //     guardian_mfa_page: {
  //       enabled: false,
  //       html: bag.hostedGuardianMfaHtml
  //     },
  //     error_page: {
  //       show_log_link: false,
  //       url: ''
  //     },
  //     flags: {
  //       change_pwd_flow_v1: false,
  //       enable_client_connections: true,
  //       enable_apis_section: true,
  //       enable_pipeline2: false
  //     },
  //     friendly_name: '',
  //     picture_url: '',
  //     support_email: '',
  //     support_url: '',
  //     allowed_logout_urls: [],
  //     default_audience: '',
  //     default_directory: ''
  //   }),

  //   spell.updateHostedLoginPage({
  //     custom_login_page_on: false,
  //     custom_login_page: bag.hostedLoginHtml
  //   }),

  //   spell.updateEmailTemplate('verify_email', {
  //     disabled: false,
  //     resultUrl: '',
  //     urlLifetimeInSeconds: 432000,
  //     from: '',
  //     subject: '',
  //     body: bag.verifyEmailHtml,
  //     syntax: 'liquid'
  //   }),
  //   spell.updateEmailTemplate('welcome_email', {
  //     disabled: true,
  //     from: '',
  //     subject: '',
  //     body: bag.welcomeEmailHtml,
  //     syntax: 'liquid'
  //   }),
  //   spell.updateEmailTemplate('reset_email', {
  //     resultUrl: '',
  //     urlLifetimeInSeconds: 432000,
  //     from: '',
  //     subject: '',
  //     body: bag.resetEmailHtml,
  //     syntax: 'liquid'
  //   }),
  //   spell.updateEmailTemplate('blocked_account', {
  //     resultUrl: '',
  //     urlLifetimeInSeconds: 432000,
  //     from: '',
  //     subject: '',
  //     body: bag.blockedAccountEmailHtml,
  //     syntax: 'liquid'
  //   }),
  //   spell.updateEmailTemplate('stolen_credentials', {
  //     from: '',
  //     subject: '',
  //     body: bag.stolenCredentialsEmailHtml,
  //     syntax: 'liquid'
  //   })
  // ])

  // .deleteAllCrons()
  // .deleteAllWebtasks();
