/// <reference path="jasmine.d.ts" />

/// <reference path="Mocks.ts" />

describe('The engine', () => {
   var engine: ex.Engine;
   var scene: ex.Scene;   
   var mock = new Mocks.Mocker();
   var loop: Mocks.IGameLoop;

   beforeEach(() => {
      engine = TestUtils.engine();
      scene = new ex.Scene(engine);
      engine.currentScene = scene;
      loop = mock.loop(engine);

      engine.start();
   });

   afterEach(() => {
      engine.stop();
   });

   it('should emit a preframe event', () => {
      var fired = false;
      engine.on('preframe', () => fired = true);

      loop.advance(100);

      expect(fired).toBe(true);
   });

   it('should emit a postframe event', () => {
      var fired = false;
      engine.on('postframe', () => fired = true);

      loop.advance(100);

      expect(fired).toBe(true);
   });

   it('should emit a preupdate event', () => {
      var fired = false;
      engine.on('preupdate', () => fired = true);

      loop.advance(100);

      expect(fired).toBe(true);
   });

   it('should emit a postupdate event', () => {
      var fired = false;
      engine.on('postupdate', () => fired = true);

      loop.advance(100);

      expect(fired).toBe(true);
   });

   it('should emit a predraw event', () => {
      var fired = false;
      engine.on('predraw', () => fired = true);

      loop.advance(100);

      expect(fired).toBe(true);
   });

   it ('should emit a postdraw event', () => {
      var fired = false;
      engine.on('postdraw', () => fired = true);

      loop.advance(100);

      expect(fired).toBe(true);
   });
   
   it('should tell engine is running', () => {
      var status = engine.isPaused();
      expect(status).toBe(false);
   });
   
   it('should tell engine is paused', () => {
      engine.stop();
      var status = engine.isPaused();
      expect(status).toBe(true);
   });
   
   it('should again tell engine is running', () => {
      engine.start();
      var status = engine.isPaused();
      expect(status).toBe(false);
   });

   it('should return screen dimensions', () => {
      engine.start();
      var left = engine.screenToWorldCoordinates(ex.Vector.Zero).x;
      var top = engine.screenToWorldCoordinates(ex.Vector.Zero).y;
      var right = left + engine.getDrawWidth();
      var bottom = top + engine.getDrawHeight();
      var localBoundingBox = new ex.BoundingBox(left, top, right, bottom);
      expect(engine.getWorldBounds()).toEqual(localBoundingBox);
   });
   
   it('should accept a displayMode of Position', () => {
     expect(engine.displayMode).toEqual(ex.DisplayMode.Position);
   });
   
   it('should accept strings to position the window', () => {
     expect(engine.canvas.style.top).toEqual('0px');
   });
   
   it('should accept AbsolutePosition Interfaces to position the window', () => {
     var game = new ex.Engine({
       height: 600,
       width: 800,
       displayMode: ex.DisplayMode.Position,
       position: {top: 1, left: '5em'},
       suppressConsoleBootMessage: true,
       suppressMinimumBrowserFeatureDetection: true
     });
     
     expect(game.canvas.style.top).toEqual('1px');
   });
   
   it('should accept backgroundColor', () => {
      var game = new ex.Engine({
        height: 600,
        width: 800,
        backgroundColor: ex.Color.White,
        suppressConsoleBootMessage: true,
        suppressMinimumBrowserFeatureDetection: true
      });

      expect(game.backgroundColor.toString()).toEqual(ex.Color.White.toString());
   });

   it('should accept default backgroundColor #2185d0', () => {
      var game = new ex.Engine({
         height: 600,
         width: 800,
         suppressConsoleBootMessage: true,
         suppressMinimumBrowserFeatureDetection: true
      });

      expect(game.backgroundColor.toString()).toEqual(ex.Color.fromHex('#2185d0').toString());
   });

});