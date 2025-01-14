import { UUID } from 'angular2-uuid';
import { Expose, classToClass, Exclude } from 'class-transformer';

enum PermissionEnum {
	NONE,
	CAN_SEE,
	CAN_USE,
	CAN_EDIT
}

export class VariablePermission {
	static readonly NONE  = new VariablePermission(PermissionEnum.NONE, 'No Permission', []);
	static readonly CAN_USE = new VariablePermission(PermissionEnum.CAN_USE, 'Can use', ['execute']);
	static readonly CAN_SEE  = new VariablePermission(PermissionEnum.CAN_SEE, 'Can decrypt', ['read', 'execute']);
	static readonly CAN_EDIT  = new VariablePermission(PermissionEnum.CAN_EDIT, 'Can modify', ['read', 'update', 'delete', 'execute']);
	static readonly PERMISSIONS  = [ VariablePermission.NONE, VariablePermission.CAN_USE, VariablePermission.CAN_SEE, VariablePermission.CAN_EDIT ]

	// private to disallow creating other instances of this type
	private constructor(public readonly key: PermissionEnum, public readonly description: any, public readonly crud: string[]) {}
}

export class Variable {

    @Expose({ name: "id_" })
    id: string;
    
    name: string;
    
    value: string;

    description?: string;

    @Exclude()
	isHidden: boolean = true;
    
    constructor() {
        this.id = UUID.UUID();
    }

    clone() {
        return classToClass(this, { ignoreDecorators: true });
    }
}
