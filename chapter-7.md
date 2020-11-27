# Component Deep Dive

## Class-based vs. Functional Components

| class based | functional |
|--- | --- |
| *class XY extends Component* | *const XY = props => { ... }* |
| Access state | Access to state (useState())
| Lifecycle hooks | Lifecycle hooks | 
| Access state via _this_ | Access state via _props_ |
| Use if you need to manage state or access to _Lifecyle hooks_ and you don't want to use _React Hooks_ | Use in all other cases