import React from "react"
import ReactGridLayout, { Layout, WidthProvider } from "react-grid-layout"
import { IManipulateSettingsProps, withSettings } from "../helpers/serialization"

// makes the RGL responsive-ish
const RGL = WidthProvider(ReactGridLayout)

interface ISettings {
  layout: Layout[]
}

interface IProps extends IManipulateSettingsProps<ISettings>, ISettings {
}

class RGLWrapperInternal extends React.Component<IProps, any> {
  constructor(props : IProps) {
    super(props)

    this.onLayoutChange = this.onLayoutChange.bind(this)
  }

  public render() {
    return (
      <RGL
        layout={this.props.layout}
        compactType={null}
        useCSSTransforms={true}
        onLayoutChange={this.onLayoutChange}
      >
        {this.props.children}
      </RGL>
    )
  }

  private onLayoutChange(layout : Layout[]) {
    if (layout.length === 0 ) {
      return
    }

    this.props.updateSettings({
      layout
    })
  }
}

// we generalize this because externally we don't want folks to know that we need updateSettings
export const RGLWrapper = withSettings(RGLWrapperInternal) as React.ComponentType<any>