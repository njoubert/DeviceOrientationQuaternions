(function(){

    /* Requires Quaternion.js */

    // Storage for the starting quaternion rotation we compare against.
    var _qstart = null;

    var displayRawOrientation = function(doe) {
        iH = "orientation raw:<br>"
        iH += "a = " + doe.alpha + "<br>"
        iH += "b = " + doe.beta + "<br>"
        iH += "g = " + doe.gamma + "<br>"    
        document.getElementById("orientation-raw").innerHTML = iH;

    }

    var deg2rad = function(deg) {
        return deg*(Math.PI/180);
    }

    var rad2deg = function(rad) {
        return rad*(180/Math.PI);
    }

    var calculateQuaternionDifference = function(doe) {

        var qcurrent = new Quaternion(0,0,0,0);
        
        // Step: HERE WE GO FROM EULER TO QUATERNION:
        // ====================================================================
        
        // TODO: Check that the order is correct. I think it is but not sure.
        qcurrent.setFromEuler(deg2rad(doe.alpha), deg2rad(doe.beta), deg2rad(doe.gamma), 'XYZ');
        qcurrent.normalize();

        // Save if we don't have a starting position yet
        if (_qstart == null) {
            _qstart = qcurrent
        }

        // Step: CALCULATE ROTATION FROM OLD TO NEW ORIENTATION
        // ====================================================================
        var qinv = qcurrent.inverse()
        var qdiff = _qstart.mult(qinv)


        // Step: Alternative: Calculate the dot product to get angle
        // ====================================================================
        var qdot = 0;
        qdot += qcurrent.x * _qstart.x;
        qdot += qcurrent.y * _qstart.y;
        qdot += qcurrent.z * _qstart.z;
        qdot += qcurrent.w * _qstart.w;

        var angle = rad2deg(Math.acos(qdot));

        document.getElementById("angle-diff-dot").innerHTML = angle;

    }


    

    /* LOADING HERE: */

    window.resetQuat = function() {
        _qstart = null;
    }

    document.getElementById("orientation-raw").innerHTML = "Script loading"

    // https://developer.mozilla.org/en-US/docs/Web/API/Window/ondeviceorientation
    window.ondeviceorientation = function(doe) {
        displayRawOrientation(doe);
        calculateQuaternionDifference(doe);
    }


})();