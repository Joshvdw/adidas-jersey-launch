mergeInto(LibraryManager.library, {
  open_video: function (video_name) {
    window.dispatchReactUnityEvent("open_video",Pointer_stringify(video_name));
  },
});
