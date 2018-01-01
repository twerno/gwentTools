// import * as React from 'react';
// // import { ChangeEvent } from 'react';

// export interface ILocalValidator<T>
// {
//   validate(value: T | null | undefined): string[] | null;
// }

// export class Field<T>
// {

//   public value: T | undefined;

//   public constructor(public validators: Array<ILocalValidator<T>>)
//   {

//   }

// }

// interface IError
// {
//   source: 'LOCAL' | 'REMOTE';
//   msg: string;
// }

// interface IFieldProp<T>
// {
//   field: Field<T>;
//   valueUpdated: (newVal: T) => void;
// }

// interface IFieldState<T>
// {
//   rawValue: T | null | undefined;
//   localErrors: string[];
// }

// export class TextFieldInput extends React.Component<IFieldProp<string>, IFieldState<string>>
// {

//   public render(): JSX.Element
//   {
//     return (
//       <input
//         value={this.state.rawValue || ''}
//         onChange={(event) => this.onChangeHandler(event)}
//         onBlur={(event) => this.onBlurHandler(event)}
//       />
//     );
//   }

//   private onChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void
//   {
//     this.setState((prevState, props) => ({ rawValue: event.target.value }));
//   }

//   private onBlurHandler(event: React.FocusEvent<HTMLInputElement>): void
//   {
//     this.setState((prevState, props) =>
//     {
//       const newLocalErrors = TextFieldInput.validate(prevState, props);

//       return { localErrors: newLocalErrors };
//     },
//       () => { if (!TextFieldInput.isCorrect(this.state) this.props.valueUpdated(this) }
//     );
//   }

//   public static validate(state: IFieldState<string>, props: IFieldProp<string>): string[]
//   {
//     return props.field.validators
//       .map((validator) => validator.validate(state.rawValue) || [])
//       .reduce((a, b) => a.concat(b));
//   }

//   public static isCorrect(state: IFieldState<string>): boolean
//   {
//     return state.localErrors.length === 0;
//   }
// }

// // export class InputWithValidator extends React.
// // {

// // }

// {/* <input
//   className="col-md-2"
//   value={unit.strength}
//   name={'' + this.props.enthusiasmLevel}
//   onChange={(event) => this.onStrengthChange(index, event)}
// // onBlur={(event) => this.onStrengthChange(index, event)}
// /> */}
