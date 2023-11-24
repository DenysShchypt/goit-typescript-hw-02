/*
  Використовуйте generics та інтерфейси, щоб виправити помилку в наступних класах:
*/
interface ComponentT{
  title:string;
}
class Component<T> {
  constructor (public props:T) {}
}
interface PageT extends ComponentT{
  title:string;
}
class Page extends Component<ComponentT>{

pageInfo (){
    console.log(this.props.title);
  }
}

export {};

