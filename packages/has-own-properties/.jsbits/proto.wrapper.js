/*
  Object.prototype.$_NAME v$_VERSION
  @license $_LICENSE
*/
(function (ObjectProto) {
/*#if 1
$_PLACEHOLDER
//#else make linters happy */
  const $_NAME = (x) => x
  //#endif

  Object.defineProperty(ObjectProto, '$_NAME', {
    value: $_NAME,
    configurable: true,
    writable: true,
  })

})(Object.prototype);
