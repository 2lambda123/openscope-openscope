import ava from 'ava';
import sinon from 'sinon';
import CanvasStageModel from '../../src/assets/scripts/client/canvas/CanvasStageModel';
import { SCALE } from '../../src/assets/scripts/client/constants/canvasConstants';

ava.beforeEach(() => {
    CanvasStageModel._init();
});

ava.afterEach(() => {
    CanvasStageModel.reset();
});

ava('throws when called to instantiate', (t) => {
    t.throws(() => new CanvasStageModel());
});

ava('.translatePixelsToKilometers() divides pixels by scale', (t) => {
    const expectedResult = 12.5;
    const pixelValueMock = 100;
    const result = CanvasStageModel.translatePixelsToKilometers(pixelValueMock);

    t.true(result === expectedResult);
});

ava('.translateKilometersToPixels() multiplies kilometers by scale', (t) => {
    const expectedResult = 100;
    const kilometerValueMock = 12.5;
    const result = CanvasStageModel.translateKilometersToPixels(kilometerValueMock);

    t.true(result === expectedResult);
});

ava('.zoomOut() increases #_scale by SCALE.CHANGE_FACTOR', (t) => {
    const previousScale = CanvasStageModel._scale;

    CanvasStageModel.zoomOut();

    const result = CanvasStageModel._scale / previousScale;

    t.true(result === SCALE.CHANGE_FACTOR);
});

ava('.zoomOut() resets #_scale to #_scaleMin when #_scale is < #scaleMin', (t) => {
    CanvasStageModel._scale = 0.5;
    CanvasStageModel.zoomOut();


    t.true(CanvasStageModel._scale === CanvasStageModel._scaleMin);
});

ava('.zoomOut() calls ._storeZoomLevel()', (t) => {
    const _storeZoomLevelSpy = sinon.spy(CanvasStageModel, '_storeZoomLevel');

    CanvasStageModel.zoomOut();

    t.true(_storeZoomLevelSpy.calledOnce);

    _storeZoomLevelSpy.restore();
});

ava('.zoomOut() calls ._eventBus.trigger()', (t) => {
    const _eventBusTrigger = sinon.spy(CanvasStageModel._eventBus, 'trigger');

    CanvasStageModel.zoomOut();

    t.true(_eventBusTrigger.calledOnce);

    _eventBusTrigger.restore();
});

ava('.zoomIn() increases #_scale by SCALE.CHANGE_FACTOR', (t) => {
    CanvasStageModel._scale = 50;
    const previousScale = CanvasStageModel._scale;

    CanvasStageModel.zoomIn();

    const result = previousScale / CanvasStageModel._scale;

    t.true(result === SCALE.CHANGE_FACTOR);
});

ava('.zoomIn() resets #_scale to #_scaleMax when #_scale is > #scaleMax', (t) => {
    CanvasStageModel._scale = 80;
    CanvasStageModel.zoomIn();

    t.true(CanvasStageModel._scale === CanvasStageModel._scaleMax);
});

ava('.zoomIn() calls ._storeZoomLevel()', (t) => {
    const _storeZoomLevelSpy = sinon.spy(CanvasStageModel, '_storeZoomLevel');

    CanvasStageModel.zoomIn();

    t.true(_storeZoomLevelSpy.calledOnce);

    _storeZoomLevelSpy.restore();
});

ava('.zoomIn() calls ._eventBus.trigger()', (t) => {
    const _eventBusTrigger = sinon.spy(CanvasStageModel._eventBus, 'trigger');

    CanvasStageModel.zoomIn();

    t.true(_eventBusTrigger.calledOnce);

    _eventBusTrigger.restore();
});
