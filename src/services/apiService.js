class ApiService {
  local (access) {
      switch (access) {
          case 'oauth':
            return 'http://10.10.20.8:1189/api/oauth/v1'
          case 'dev':
            return 'http://10.10.20.8:1191/api/procurement/v1/'
          case 'upload':
            return 'http://10.10.20.8:1192/api/procurement/v1'
          case 'hr':
            return 'http://10.10.20.8:2189/api/hr/v1'
          case 'fautility':
            return 'http://10.10.20.8:6189/api/sanqua_fautility/v1'
          default:
            return 'http://localhost:1189/api/oauth/v1'
      }
  }

  public (access) {
      switch (access) {
          case 'oauth':
            return 'http://175.106.14.156:7091/api/oauth/v1'
          case 'dev':
            return 'http://175.106.14.156:7092/api/procurement/v1/'
          case 'upload':
            return 'http://175.106.14.156:7093/api/procurement/v1'
          case 'hr':
            return 'http://175.106.14.156:7094/api/hr/v1'
          case 'fautility':
            return 'not found'
          default:
            return 'http://localhost:7091/api/oauth/v1'
      }
  }

  private (access) {
      switch (access) {
          case 'oauth':
            return 'http://10.10.16.10:1189/api/oauth/v1'
          case 'dev':
            return 'http://10.10.16.10:1191/api/procurement/v1/'
          case 'upload':
            return 'http://10.10.16.10:1192/api/procurement/v1'
          case 'hr':
            return 'http://10.10.16.10:2189/api/hr/v1'
          case 'fautility':
            return 'http://10.10.16.10:6189/api/sanqua_fautility/v1'
          default:
            return 'http://localhost:1189/api/oauth/v1'
      }
  }
}

export default new ApiService()
