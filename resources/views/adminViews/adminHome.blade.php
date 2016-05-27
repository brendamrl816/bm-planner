@extends('shared.master')
@section('title', 'Admin Control Panel')

@section('content')

<div class="mainBackground"><img class="mainBackground-image" src="/pictures/wood.jpg"></div>
        <div class="secondBody">
            
             <div class="barDiv">
                <div style="display:inline-block; height:100%; vertical-align:middle"></div>
                
                <a class="barDiv-logo" style="text-decoration:none; color:white" href="/">
                  <div style="font-size:150%; font-weight:bold; text-shadow: 1px 1px 1px #000000">gmPlanner</div>
                </a>
            </div>
            
            <div class="secondBodyDiv">
                
               <div class="tableDiv">
                    <table class="adminTable">
                        <tr class="adminTr">
                            <th class="adminTd">Manage User:</th>
                            <td class="adminTd" colspan="2"><div class="adminTd-inside"><a class="adminLink" href="/admin/users" >All Users</a></div></td>
                        </tr>
                        <tr class="adminTr">
                            <th class="adminTd">Manage Roles:</th>
                            <td class="adminTd" ><div class="adminTd-inside"><a class="adminLink" href="/admin/roles">All Roles</a></div></td>
                            <td class="adminTd" ><div class="adminTd-inside"><a class="adminLink" href="/admin/roles/create">Create A Role</a></div></td>
                        </tr>
                    </table>
                </div>
                    
                    
            </div>
        
</div>

  

@endsection