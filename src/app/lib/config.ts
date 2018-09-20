import { remote } from "electron"

class Config {
  private data : { [key : string] : any } = {}

  public flush() {
    this.getLib().setAll(this.data)
  }

  public get(key ?: string) : any {
    
  }

  public set(keyOrVal : string | any, val ?: any) : void {

  }

  private isRenderer () {
    // running in a web browser
    if (typeof process === 'undefined') {
      return true
    }
  
    // node-integration is disabled
    if (!process) {
      return true
    }

    // We're in node.js somehow
    if (!process.type) {
      return false
    }

    return process.type === 'renderer'
  }

  private getLib() {
    return this.isRenderer() ? remote.require('electron-settings') : require('electron-settings')
  }
}

export default new Config()