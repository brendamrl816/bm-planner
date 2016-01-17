@extends('master')
@section('name', 'Register')


@section('content')

  <form method="post"> 
  
      @foreach ($errors->all() as $error)
        <p>{{ $error }}</p>
      @endforeach
      
      {!! csrf_field() !!}
      
      Name: <input type="text" name="name" value="{{ old('name') }}"><br>
      Email: <input type="text" name="email" value="{{ old('email') }}"><br>
      Password: <input type="password" name="password"><br>
      Confirm Password: <input type="password" name="password_confirmation"><br>
      
      <button type="reset" class="btn btn-default">Cancel</button>
      <button type="submit" class="btn btn-primary">Submit</button>
  
  </form>

@endsection

