import { SystemPanelComponent } from './system-panel.component';
import { System } from 'src/app/model/system/system';
import { NodeStatus } from 'src/app/model/system/node-status';
import { SmartNode } from 'src/app/model/system/smart-node';
import { SimpleNode } from 'src/app/model/system/simple-node';

describe('SystemPanelComponent', () => {
  let component: SystemPanelComponent;

  beforeEach(() => {
    component = new SystemPanelComponent();
  });

  /************************
   *  getStandaloneNodes  *
   ************************/
  it('#getStandaloneNodes - system with one non standalone smart node - should return an empty array', () => {
    // ARRANGE
    const system: System = {
      color: '',
      name: '',
      id: '1',
      icon: '',
      smartNodes: [
        {
          id: '1',
          name: 'smartNode1',
          isStandalone: false,
          status: NodeStatus.ONLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
      ],
    };

    // ACT
    component.system = system;

    // ASSERT
    expect(component.getStandaloneNodes()).toEqual([]);
    expect(component.getStandaloneNodes().length).toBe(0);
  });

  it('#getStandaloneNodes - system with one standalone smart node - should return an array of one element', () => {
    // ARRANGE
    const system: System = {
      color: '',
      name: '',
      id: '1',
      icon: '',
      smartNodes: [
        {
          id: '1',
          name: 'smartNode1',
          isStandalone: true,
          status: NodeStatus.ONLINE,
        },
      ],
    };

    // ACT
    component.system = system;

    // ASSERT
    expect(component.getStandaloneNodes().length).toBe(1);
  });

  it('#getStandaloneNodes - system with one standalone smart node and one non standalone smart node - should return an array of one element', () => {
    // ARRANGE
    const system: System = {
      color: '',
      name: '',
      id: '1',
      icon: '',
      smartNodes: [
        {
          id: '1',
          name: 'smartNode1',
          isStandalone: true,
          status: NodeStatus.ONLINE,
        },
        {
          id: '2',
          name: 'smartNode2',
          isStandalone: false,
          status: NodeStatus.ONLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
      ],
    };

    // ACT
    component.system = system;

    // ASSERT
    expect(component.getStandaloneNodes().length).toBe(1);
  });

  /***************************
   *  getNonStandaloneNodes  *
   ***************************/
  it('#getNonStandaloneNodes - system with one non standalone smart node - should return an array of one element', () => {
    // ARRANGE
    const system: System = {
      color: '',
      name: '',
      id: '1',
      icon: '',
      smartNodes: [
        {
          id: '1',
          name: 'smartNode1',
          isStandalone: false,
          status: NodeStatus.ONLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
      ],
    };

    // ACT
    component.system = system;

    // ASSERT
    expect(component.getNonStandaloneNodes().length).toBe(1);
  });

  it('#getNonStandaloneNodes - system with one standalone smart node - should return an empty array', () => {
    // ARRANGE
    const system: System = {
      color: '',
      name: '',
      id: '1',
      icon: '',
      smartNodes: [
        {
          id: '1',
          name: 'smartNode1',
          isStandalone: true,
          status: NodeStatus.ONLINE,
        },
      ],
    };

    // ACT
    component.system = system;

    // ASSERT
    expect(component.getNonStandaloneNodes()).toEqual([]);
    expect(component.getNonStandaloneNodes().length).toBe(0);
  });

  it('#getNonStandaloneNodes - system with one standalone smart node and one non standalone smart node - should return an array of one element', () => {
    // ARRANGE
    const system: System = {
      color: '',
      name: '',
      id: '1',
      icon: '',
      smartNodes: [
        {
          id: '1',
          name: 'smartNode1',
          isStandalone: true,
          status: NodeStatus.ONLINE,
        },
        {
          id: '2',
          name: 'smartNode2',
          isStandalone: false,
          status: NodeStatus.ONLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
      ],
    };

    // ACT
    component.system = system;

    // ASSERT
    expect(component.getNonStandaloneNodes().length).toBe(1);
  });

  /***********************
   *  isStandaloneSystem  *
   ***********************/
  it('#isStandaloneSystem - system with one non standalone smart node - should return false', () => {
    // ARRANGE
    const system: System = {
      color: '',
      name: '',
      id: '1',
      icon: '',
      smartNodes: [
        {
          id: '1',
          name: 'smartNode1',
          isStandalone: false,
          status: NodeStatus.ONLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
      ],
    };

    // ACT
    component.system = system;

    // ASSERT
    expect(component.isStandaloneSystem()).toBeFalse();
  });

  it('#isStandaloneSystem - system with one standalone smart node - should return true', () => {
    // ARRANGE
    const system: System = {
      color: '',
      name: '',
      id: '1',
      icon: '',
      smartNodes: [
        {
          id: '1',
          name: 'smartNode1',
          isStandalone: true,
          status: NodeStatus.ONLINE,
        },
      ],
    };

    // ACT
    component.system = system;

    // ASSERT
    expect(component.isStandaloneSystem()).toBeTrue();
  });

  it('#isStandaloneSystem - system with one standalone smart node and one non standalone smart node - should return false', () => {
    // ARRANGE
    const system: System = {
      color: '',
      name: '',
      id: '1',
      icon: '',
      smartNodes: [
        {
          id: '1',
          name: 'smartNode1',
          isStandalone: true,
          status: NodeStatus.ONLINE,
        },
        {
          id: '2',
          name: 'smartNode2',
          isStandalone: false,
          status: NodeStatus.ONLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
      ],
    };

    // ACT
    component.system = system;

    // ASSERT
    expect(component.isStandaloneSystem()).toBeFalse();
  });

  it('#isStandaloneSystem - system with three standalone smart nodes - should return true', () => {
    // ARRANGE
    const system: System = {
      color: '',
      name: '',
      id: '1',
      icon: '',
      smartNodes: [
        {
          id: '1',
          name: 'smartNode1',
          isStandalone: true,
          status: NodeStatus.ONLINE,
        },
        {
          id: '2',
          name: 'smartNode2',
          isStandalone: true,
          status: NodeStatus.ONLINE,
        },
        {
          id: '3',
          name: 'smartNode3',
          isStandalone: true,
          status: NodeStatus.ONLINE,
        },
      ],
    };

    // ACT
    component.system = system;

    // ASSERT
    expect(component.isStandaloneSystem()).toBeTrue();
  });

  /**********************************
   *  areNonStandaloneNodesOffline  *
   **********************************/
  it('#areNonStandaloneNodesOffline - system with three non standalone smart node online - should return false', () => {
    // ARRANGE
    const system: System = {
      color: '',
      name: '',
      id: '1',
      icon: '',
      smartNodes: [
        {
          id: '1',
          name: 'smartNode1',
          isStandalone: false,
          status: NodeStatus.ONLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
        {
          id: '2',
          name: 'smartNode1',
          isStandalone: false,
          status: NodeStatus.ONLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
        {
          id: '3',
          name: 'smartNode1',
          isStandalone: false,
          status: NodeStatus.ONLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
      ],
    };

    // ACT
    component.system = system;

    // ASSERT
    expect(component.areNonStandaloneNodesOffline()).toBeFalse();
  });

  it('#areNonStandaloneNodesOffline - system with one non standalone smart node online and two offline - should return false', () => {
    // ARRANGE
    const system: System = {
      color: '',
      name: '',
      id: '1',
      icon: '',
      smartNodes: [
        {
          id: '1',
          name: 'smartNode1',
          isStandalone: false,
          status: NodeStatus.ONLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
        {
          id: '2',
          name: 'smartNode1',
          isStandalone: false,
          status: NodeStatus.OFFLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
        {
          id: '3',
          name: 'smartNode1',
          isStandalone: false,
          status: NodeStatus.OFFLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
      ],
    };

    // ACT
    component.system = system;

    // ASSERT
    expect(component.areNonStandaloneNodesOffline()).toBeFalse();
  });

  it('#areNonStandaloneNodesOffline - system with three non standalone smart node offline - should return true', () => {
    // ARRANGE
    const system: System = {
      color: '',
      name: '',
      id: '1',
      icon: '',
      smartNodes: [
        {
          id: '1',
          name: 'smartNode1',
          isStandalone: false,
          status: NodeStatus.OFFLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
        {
          id: '2',
          name: 'smartNode1',
          isStandalone: false,
          status: NodeStatus.OFFLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
        {
          id: '3',
          name: 'smartNode1',
          isStandalone: false,
          status: NodeStatus.OFFLINE,
          simpleNodes: [
            { id: '1', name: 'simpleNode1', status: NodeStatus.ONLINE },
          ],
        },
      ],
    };

    // ACT
    component.system = system;

    // ASSERT
    expect(component.areNonStandaloneNodesOffline()).toBeTrue();
  });

  /*****************
   *  isSmartNode  *
   *****************/
  it('#isSmartNode - one smart node - should return true', () => {
    // ARRANGE
    const node: SmartNode = {
      id: '1',
      name: 'smartNode',
      isStandalone: true,
      status: NodeStatus.ONLINE,
    };

    // ACT
    const isSmart = component.isSmartNode(node);

    // ASSERT
    expect(isSmart).toBeTrue();
  });

  it('#isSmartNode - one simple node - should return false', () => {
    // ARRANGE
    const node: SimpleNode = {
      id: '1',
      name: 'smartNode',
      status: NodeStatus.OFFLINE,
    };

    // ACT
    const isSmart = component.isSmartNode(node);

    // ASSERT
    expect(isSmart).toBeFalse();
  });
});
