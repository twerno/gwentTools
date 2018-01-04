import { Unit } from '@src/duelCalc/DuelCalcComponent';
import { ImgSrc } from '@src/ImgSrc';
import * as React from 'react';
import { Button } from 'react-bootstrap';

export interface UnitRendererProps
{
  unit: Unit;
  strengthChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  armorChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeUnitHandler: () => void;
}

export function UnitRenderer(props: UnitRendererProps)
{
  return (

    <div className="unitEditor" key={props.unit.id}>
      <Button className="removeUnitBtn" onClick={() => props.removeUnitHandler()}>
        <img src={ImgSrc.DELETE} width="16" />
      </Button>
      <div className="editInputs row">
        <div className="editInput col-xs-6">
          <div className="input-group">
            <div className="input-group-addon">
              <img src={ImgSrc.SWORD} width="20" />
            </div>
            <input
              type="tel"
              className="form-control"
              placeholder="Strength"
              value={props.unit.strength === undefined ? '' : props.unit.strength}
              onChange={(event) => props.strengthChangeHandler(event)}
            />
          </div>
        </div>

        <div className="editInput col-xs-6">
          <div className="input-group">
            <div className="input-group-addon">
              <img src={ImgSrc.SHIELD} width="20" />
            </div>
            <input
              type="tel"
              className="form-control"
              placeholder="Armor"
              value={props.unit.armor === undefined ? '' : props.unit.armor}
              onChange={(event) => props.armorChangeHandler(event)}
            />
          </div>
        </div>

      </div>

    </div>
  );
}
