/*
  Adapted from "A Perpetual Easter and Passover Calculator"
  http://www.staff.science.uu.nl/~gent0113/easter/eastercalculator_main.htm
*/
/* eslint-disable */

// Generalized modulo function (m mod n) - also valid for negative values of m
function gmod(m,n){
  return ((m%n)+n)%n;
}

// Gregorian Easter Sunday date
function greg_easter(year){
  var a=gmod(year,19);
  var gn=a+1;                                           // Golden Number
  var b=Math.floor(year/100);
  var c=gmod(year,100);
  var d=Math.floor(b/4);
  var e=gmod(b,4);
  var f=Math.floor((b+8)/25);
  var g=Math.floor((b-f+1)/3);
  var h=gmod((19*a+b-d-g+15),30);
  var i=Math.floor(c/4);
  var k=gmod(c,4);
  var l=gmod((2*e+2*i-h-k+4),7);
  var m=Math.floor((a+11*h+22*l)/451);
  var ep=gmod((11*a+8-b+d+Math.floor((8*b+13)/25)),30);
  var fmg
  if(ep <= 23) fmg=136-ep;                          // Easter full moon [days after -92 March]
  if((ep === 24) || (ep === 25)) fmg=141;
  if((ep === 25) && (gn > 11)) fmg=140;
  if(ep >= 26) fmg=166-ep;
  var dmg=114+h-7*m+l;                                  // Easter Sunday [days after -92 March]
  var fmmg=Math.floor(fmg/31);                          // month Easter full moon [March = 3; April = 4]
  var fmdg=gmod(fmg,31)+1;                              // day Easter full moon
  var esmg=Math.floor(dmg/31);                          // month Easter Sunday [March = 3; April = 4]
  var esdg=gmod(dmg,31)+1;                              // day Easter Sunday
  return new Array(dmg,esdg,esmg,fmg,fmdg,fmmg,gn,ep);
}

module.exports = function (y) {
  var g_easter = greg_easter(y)
  var dayg = g_easter[1]
  var mong = g_easter[2]-1
  return new Date(y, mong, dayg, 0, 0, 0)
}
